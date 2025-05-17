'use client';
import { useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  i: number;
  j: number;
  id: string;
  revealed: boolean;
}

interface NodeMap {
  [key: string]: Node;
}

const Network = () => {
  useEffect(() => {
    const svg = document.getElementById('network') as unknown as SVGSVGElement;
    const spacing = 50;
    const nodes: Node[] = [];
    const nodeMap: NodeMap = {};
    const edges: { [key: string]: SVGLineElement } = {};

    const asiaMap = [
      '00001010000001',
      '00101111001011',
      '00111111100111',
      '00111111110001',
      '00011101111011',
      '01011110111111',
      '00011101011011',
      '01001111110000',
      '11101111100000',
      '01111011000000',
      '00101010000000',
    ];

    const offsetX = window.innerWidth / 6 - (asiaMap[0].length * spacing) / 2;
    const offsetY =
      window.innerHeight / 4 +
      window.innerHeight / 2 -
      (asiaMap.length * spacing) / 2;

    for (let j = 0; j < asiaMap.length; j++) {
      for (let i = 0; i < asiaMap[j].length; i++) {
        if (asiaMap[j][i] === '1') {
          const x = i * spacing + offsetX;
          const y = j * spacing + offsetY;
          const id = `${i},${j}`;
          const node: Node = { x, y, i, j, id, revealed: false };
          nodes.push(node);
          nodeMap[id] = node;
        }
      }
    }

    function connect(a: Node, b: Node) {
      const key = `${a.id}->${b.id}`;
      if (edges[key]) return;

      const line = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      line.setAttribute('x1', `${a.x}`);
      line.setAttribute('y1', `${a.y}`);
      line.setAttribute('x2', `${b.x}`);
      line.setAttribute('y2', `${b.y}`);
      line.classList.add('edge');
      svg.appendChild(line);
      edges[key] = line;
    }

    for (let node of nodes) {
      const { i, j } = node;
      const right = nodeMap[`${i + 1},${j}`];
      const down = nodeMap[`${i},${j + 1}`];
      if (right) connect(node, right);
      if (down) connect(node, down);
    }

    function revealNode(node: Node, fromNode: Node | null = null) {
      if (node.revealed) return;
      node.revealed = true;

      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      circle.setAttribute('data-id', node.id);
      circle.classList.add('node');
      circle.setAttribute('r', '2');

      if (fromNode) {
        circle.setAttribute('cx', `${fromNode.x}`);
        circle.setAttribute('cy', `${fromNode.y}`);
        circle.style.opacity = '0';
        svg.appendChild(circle);
        setTimeout(() => {
          circle.setAttribute('cx', `${node.x}`);
          circle.setAttribute('cy', `${node.y}`);
          circle.style.opacity = '0.6';
        }, 10);
      } else {
        circle.setAttribute('cx', `${node.x}`);
        circle.setAttribute('cy', `${node.y}`);
        circle.style.opacity = '0.6';
        svg.appendChild(circle);
      }
    }

    const initialNodes = nodes.sort(() => 0.5 - Math.random()).slice(0, 10);
    for (const node of initialNodes) {
      revealNode(node);
    }

    function animateFlow(startNode: Node, depth = 2, delay = 400) {
      const visited = new Set<string>();
      const queue: { node: Node; prev: Node | null }[] = [
        { node: startNode, prev: null },
      ];
      let step = 0;

      function next() {
        if (queue.length === 0 || step >= depth) return;

        const { node, prev } = queue.shift()!;
        if (visited.has(node.id)) return;
        visited.add(node.id);

        const prevCircle = prev
          ? (svg.querySelector(
              `.node[data-id='${prev.id}']`
            ) as SVGCircleElement | null)
          : null;
        const currCircle = svg.querySelector(
          `.node[data-id='${node.id}']`
        ) as SVGCircleElement | null;

        if (prevCircle) prevCircle.style.opacity = '0';

        setTimeout(() => {
          if (prev) {
            const key = `${prev.id}->${node.id}`;
            const line = edges[key] || edges[`${node.id}->${prev.id}`];
            if (line) {
              line.classList.add('active');
              line.style.strokeDashoffset = '0';

              setTimeout(() => {
                line.classList.remove('active');
                line.style.strokeDashoffset = '100';
              }, 1000);
            }
          }

          if (currCircle) currCircle.style.opacity = '1';

          const { i, j } = node;
          const neighbors: Node[] = [
            nodeMap[`${i + 1},${j}`],
            nodeMap[`${i - 1},${j}`],
            nodeMap[`${i},${j + 1}`],
            nodeMap[`${i},${j - 1}`],
          ].filter((n): n is Node => !!n && !n.revealed);

          for (const neighbor of neighbors) {
            revealNode(neighbor, node);
          }

          const unvisited: Node[] = [
            nodeMap[`${i + 1},${j}`],
            nodeMap[`${i - 1},${j}`],
            nodeMap[`${i},${j + 1}`],
            nodeMap[`${i},${j - 1}`],
          ].filter((n): n is Node => !!n && !visited.has(n.id) && n.revealed);

          for (let n of unvisited.sort(() => 0.5 - Math.random())) {
            queue.push({ node: n, prev: node });
            break;
          }

          step++;
          setTimeout(next, delay);
        }, 200);
      }

      next();
    }

    const interval = setInterval(() => {
      const visibleNodes = nodes.filter((n) => n.revealed);
      for (let i = 0; i < 3; i++) {
        const startNode =
          visibleNodes[Math.floor(Math.random() * visibleNodes.length)];
        animateFlow(startNode, 3, 400);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx global>{`
        #network {
          width: 100vw;
          height: 100vh;
          display: block;
          position: absolute;
          z-index: 1;
          top: 0;
          right: 0;
          pointer-events: none;
        }
        .node {
          fill: #000;
          opacity: 0.6;
          transition: opacity 0.4s ease, cx 0.6s ease, cy 0.6s ease;
        }
        .edge {
          stroke: #000;
          stroke-width: 1;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          transition: stroke-dashoffset 1s ease;
        }
        .edge.active {
          stroke: #000;
        }
      `}</style>
      <svg id="network" xmlns="http://www.w3.org/2000/svg"></svg>
    </>
  );
};

export default Network;

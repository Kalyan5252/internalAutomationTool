# 🔧 Internal Automation Tool

A lightweight, extensible platform for uploading, managing, and running Python automation scripts through a secure web interface.

---

## 🚀 Overview

**Internal Automation Tool** empowers teams to streamline internal operations by letting users:

- 📁 Upload Python scripts via a browser
- 🧾 View and manage all available scripts
- ▶️ Run scripts on-demand from a web dashboard
- 📤 Get real-time output and results from script executions

Ideal for dev teams, operations, and backend engineers looking to expose internal tools without direct access to the command line.

---

## 🎯 Key Features

- **Script Upload** – Upload `.py` files through the UI
- **Script Registry** – List and manage stored scripts
- **Script Execution** – Execute any script that defines a `run()` function
- **Output Display** – View execution results instantly in the dashboard

> ⚠️ Scripts must define a `run()` function to be executed.

---

## 🛠️ Tech Stack

| Layer       | Tech                      |
|-------------|---------------------------|
| Frontend    | [Next.js](https://nextjs.org/), Tailwind CSS |
| Backend     | [FastAPI](https://fastapi.tiangolo.com/) (Python) |
| Storage     | Local filesystem (scripts directory) |
| Deployment  | Ready for Docker, Railway, or custom VPS |

---

## 🧪 Script Format

Uploaded scripts should follow this format:

```python
# example_script.py
def run():
    return "Automation successful!"

import React from 'react';
import NetworkRight from '../components/Network';
import NetworkLeft from '../components/NetworkMirror';
import Signup from '../components/Signup';

const LoginPage: React.FC = () => {
  return (
    <div className="relative bg-[linear-gradient(to_right,_#fff,_#e5e7eb)] min-h-screen flex justify-center items-center">
      {/* Background Network */}
      <NetworkLeft />
      <NetworkRight />

      {/* Foreground Signup */}
      <div className="relative z-[1]">
        <Signup />
      </div>
    </div>
  );
};

export default LoginPage;

import React from 'react';

export const Header: React.FC = () => (
  <div className="absolute top-4 left-4 text-white z-10">
    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
      Cosmic Knowledge Network
    </h1>
    <p className="text-sm text-white/70 mt-2">
      Explore the interconnected web of knowledge
    </p>
  </div>
);
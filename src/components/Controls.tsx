import React from 'react';
import { Camera, RotateCcw, Type, Orbit } from 'lucide-react';

interface ControlsProps {
  onReset: () => void;
  onScreenshot: () => void;
  onToggleLabels: () => void;
  onToggleOrbit: () => void;
  showLabels: boolean;
  isOrbiting: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ 
  onReset, 
  onScreenshot, 
  onToggleLabels,
  onToggleOrbit,
  showLabels,
  isOrbiting
}) => (
  <div className="absolute top-4 right-4 flex gap-2">
    <button 
      className={`p-2 rounded-full transition-colors ${
        showLabels ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
      }`}
      onClick={onToggleLabels}
      title={showLabels ? 'Hide Labels' : 'Show Labels'}
    >
      <Type className="w-5 h-5 text-white" />
    </button>
    <button 
      className={`p-2 rounded-full transition-colors ${
        isOrbiting ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
      }`}
      onClick={onToggleOrbit}
      title={isOrbiting ? 'Stop Orbit' : 'Start Orbit'}
    >
      <Orbit className="w-5 h-5 text-white" />
    </button>
    <button 
      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      onClick={onReset}
      title="Reset View"
    >
      <RotateCcw className="w-5 h-5 text-white" />
    </button>
    <button 
      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      onClick={onScreenshot}
      title="Take Screenshot"
    >
      <Camera className="w-5 h-5 text-white" />
    </button>
  </div>
);
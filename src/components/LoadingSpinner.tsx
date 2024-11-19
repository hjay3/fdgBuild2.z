import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#000020]">
    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
  </div>
);
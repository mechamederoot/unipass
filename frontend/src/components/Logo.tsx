import React from 'react';
import { Shield, Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };
  
  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl rotate-6 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl -rotate-6 opacity-80"></div>
        <div className="relative z-10 bg-white rounded-lg p-2 shadow-lg">
          <div className="relative">
            <Shield className="h-full w-full text-primary-600" />
            <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/2 text-accent-500" />
          </div>
        </div>
      </div>
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent`}>
          Unipass
        </div>
      )}
    </div>
  );
};

export default Logo;

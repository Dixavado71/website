import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: 'green' | 'cyan' | 'purple' | 'magenta' | 'none';
  hover?: boolean;
}

export const GlassCard = ({ 
  children, 
  className, 
  glow = 'none',
  hover = true 
}: GlassCardProps) => {
  const glowClasses = {
    green: 'hover:shadow-neon-green hover:border-primary/50',
    cyan: 'hover:shadow-neon-cyan hover:border-cyan/50',
    purple: 'hover:shadow-neon-purple hover:border-purple/50',
    magenta: 'hover:shadow-[0_0_20px_rgba(255,46,209,0.5)] hover:border-magenta/50',
    none: '',
  };

  return (
    <div
      className={cn(
        'relative bg-surfaceAlt/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 transition-all duration-300',
        hover && `${glowClasses[glow]} hover:-translate-y-1`,
        className
      )}
    >
      {children}
    </div>
  );
};

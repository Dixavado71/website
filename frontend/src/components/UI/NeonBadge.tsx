import { cn } from '../../lib/utils';

export interface NeonBadgeProps {
  children: React.ReactNode;
  color?: 'green' | 'cyan' | 'purple' | 'magenta';
  size?: 'sm' | 'md';
  className?: string;
}

export const NeonBadge = ({ 
  children, 
  color = 'green', 
  size = 'sm',
  className 
}: NeonBadgeProps) => {
  const colorClasses = {
    green: 'text-primary border-primary/30 bg-primary/10',
    cyan: 'text-cyan border-cyan/30 bg-cyan/10',
    purple: 'text-purple border-purple/30 bg-purple/10',
    magenta: 'text-magenta border-magenta/30 bg-magenta/10',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 uppercase tracking-wider font-semibold rounded-full border',
        colorClasses[color],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
};

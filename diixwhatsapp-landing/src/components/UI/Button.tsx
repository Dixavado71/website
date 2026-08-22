import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background';
    
    const variants = {
      primary: 'bg-primary hover:bg-primary/90 text-black shadow-neon-green focus:ring-primary',
      secondary: 'bg-surfaceAlt hover:bg-surfaceAlt/80 text-white border border-white/10 focus:ring-purple',
      outline: 'bg-transparent hover:bg-surfaceAlt text-white border border-primary/50 focus:ring-primary',
      ghost: 'bg-transparent hover:bg-surfaceAlt/50 text-gray-300 hover:text-white focus:ring-muted',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };
    
    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionTitle = ({ 
  badge,
  title, 
  subtitle,
  align = 'center',
  className 
}: SectionTitleProps) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('mb-16', alignClasses[align], className)}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface/50 border border-white/10 rounded-full mb-6">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-gray-300 uppercase tracking-wider">{badge}</span>
        </div>
      )}
      
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-subtitle">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

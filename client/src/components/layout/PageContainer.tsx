import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React from 'react';

type PageContainerProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  maxWidth?: string;
  className?: string;
};

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ children, scrollable = true, maxWidth = 'max-w-3xl', className = '' }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          className,
          `
        mx-auto w-full flex-1 px-4 sm:px-6
        ${maxWidth} 
        ${scrollable ? 'overflow-y-auto overscroll-contain' : 'overflow-hidden'}
      `
        )}
        style={{ height: '100%' }}
      >
        {children}
      </motion.div>
    );
  }
);

export default PageContainer;

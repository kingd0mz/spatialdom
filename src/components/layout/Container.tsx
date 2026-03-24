import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '../../lib/cn';

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

function Container<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? 'div';

  return <Component className={cn('container-shell', className)} {...props} />;
}

export default Container;

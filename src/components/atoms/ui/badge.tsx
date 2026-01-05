import { cn } from '@/shared/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline'
}

export const Badge = ({ className, variant = 'default', children, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none',
        variant === 'outline' ? 'text-foreground' : 'border-transparent bg-primary text-primary-foreground',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

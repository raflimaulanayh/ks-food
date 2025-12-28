import { cn } from '@/utils/cn'

interface ContainerProps {
  className?: string
  children?: React.ReactNode
}

export const Container = ({ children, className }: ContainerProps) => {
  return <div className={cn(className, 'mx-auto w-11/12 max-w-7xl')}>{children}</div>
}

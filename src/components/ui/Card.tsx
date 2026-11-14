import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-surface rounded-2xl p-6', className)} {...props} />
}

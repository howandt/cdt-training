'use client';


import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
variant?: 'default' | 'outline';
size?: 'sm' | 'md' | 'lg';
};


const Button = forwardRef<HTMLButtonElement, ButtonProps>(
({ className, variant = 'default', size = 'md', ...props }, ref) => {
const base = 'rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';


const variants = {
default: 'bg-blue-600 text-white hover:bg-blue-700',
outline: 'border border-gray-300 text-gray-900 hover:bg-gray-100',
};


const sizes = {
sm: 'px-3 py-1 text-sm',
md: 'px-4 py-2 text-base',
lg: 'px-5 py-3 text-lg',
};


return (
<button
ref={ref}
className={cn(base, variants[variant], sizes[size], className)}
{...props}
/>
);
}
);


Button.displayName = 'Button';


export { Button };
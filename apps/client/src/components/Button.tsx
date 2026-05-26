'use client';

import { twMerge } from 'tailwind-merge';

type Props = Readonly<{
    children: React.ReactNode;
    variant: keyof typeof variants;
}> &
    Omit<JSX.IntrinsicElements['button'], 'className'>;

const variants = {
    white: 'bg-white text-black hover:bg-cream transition-colors',
    primary: 'bg-primary text-white hover:bg-red transition-colors',
    black: 'bg-black text-white hover:opacity-90 transition-colors',
};

export const Button = ({ children, variant, ...props }: Props) => {
    return (
        <button className={twMerge('h-10 px-8 font-medium rounded', variants[variant])} {...props}>
            {children}
        </button>
    );
};

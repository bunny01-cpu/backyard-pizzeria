import { twMerge } from 'tailwind-merge';
import { fetchUser } from '../lib/fetch';
import { Menu } from './Menu';

type Props = {
    isDashboard: boolean;
};

export const Header = async ({ isDashboard }: Props) => {
    const user = await fetchUser();

    return (
        <div className={twMerge(
            'h-16 w-full flex justify-between items-center sticky top-0 z-50',
            isDashboard ? 'bg-black' : 'bg-primary'
        )}>
            <h1 className="text-white text-2xl font-bold">The Backyard Pizzeria</h1>
            <Menu isDashboard={isDashboard} passUser={user} />
        </div>
    );
};

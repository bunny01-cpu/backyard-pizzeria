import { twMerge } from 'tailwind-merge';
import { fetchUser } from '../lib/fetch';
import { Menu } from './Menu';

type Props = {
    isDashboard: boolean;
};

export const Header = async ({ isDashboard }: Props) => {
    const user = await fetchUser();

    return (
        <div className={twMerge('h-20 w-full flex justify-between items-center', isDashboard && 'bg-black')}>
            <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
                    <span className="text-2xl">🍕</span>
                </div>
                <div>
                    <p className="text-white font-bold text-base leading-tight">The Backyard</p>
                    <p className="text-white font-bold text-base leading-tight">Pizzeria</p>
                </div>
            </div>
            <Menu isDashboard={isDashboard} passUser={user} />
        </div>
    );
};

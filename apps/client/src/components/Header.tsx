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
                <img
                    src="/logo.png"
                    alt="The Backyard Pizzeria"
                    className="h-14 w-14 rounded-full object-cover shadow-md"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div>
                    <p className="text-white font-bold text-lg leading-tight">The Backyard</p>
                    <p className="text-white font-bold text-lg leading-tight">Pizzeria</p>
                </div>
            </div>
            <Menu isDashboard={isDashboard} passUser={user} />
        </div>
    );
};

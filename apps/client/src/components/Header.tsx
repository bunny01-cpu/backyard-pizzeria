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
            'h-20 w-full flex justify-between items-center',
            isDashboard ? 'bg-black' : 'bg-transparent'
        )}>
            <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full border-2 border-primary flex items-center justify-center shadow-md overflow-hidden flex-shrink-0 bg-white">
                    <span className="text-2xl">🍕</span>
                </div>
                <div>
                    <p className={twMerge('font-bold text-base leading-tight', isDashboard ? 'text-white' : 'text-black')}>
                        The Backyard
                    </p>
                    <p className={twMerge('font-bold text-base leading-tight', isDashboard ? 'text-white' : 'text-primary')}>
                        Pizzeria
                    </p>
                </div>
            </div>
            <Menu isDashboard={isDashboard} passUser={user} />
        </div>
    );
};

'use client';

import { getUser } from '@/src/lib/api';
import { PizzasSection } from '@/src/sections/PizzasSection';
import { IPizza } from '@/src/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
    passPizzas: IPizza[];
};

export const DashboardClient = ({ passPizzas }: Props) => {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const response = await getUser();
            const user = response?.data?.user;

            if (!user || user.role !== 'admin') {
                router.replace('/');
            } else {
                setChecked(true);
            }
        };

        checkAuth();
    }, []);

    if (!checked) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-white text-lg">Loading...</p>
            </div>
        );
    }

    return <PizzasSection passPizzas={passPizzas} />;
};

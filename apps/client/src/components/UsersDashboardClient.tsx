'use client';

import { getUser } from '@/src/lib/api';
import { UsersSection } from '@/src/sections/UsersSection';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const UsersDashboardClient = () => {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const response = await getUser();
            const user = response?.data?.user;

            if (!user || user.role !== 'admin') {
                router.replace('/');
                return;
            }
            setChecked(true);
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

    return <UsersSection />;
};

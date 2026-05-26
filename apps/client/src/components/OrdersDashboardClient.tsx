'use client';

import { getAllOrders, getUser } from '@/src/lib/api';
import { OrdersSection } from '@/src/sections/OrdersSection';
import { IOrder } from '@/src/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const OrdersDashboardClient = () => {
    const router = useRouter();
    const [checked, setChecked] = useState(false);
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        const checkAuth = async () => {
            const response = await getUser();
            const user = response?.data?.user;

            if (!user || user.role !== 'admin') {
                router.replace('/');
                return;
            }

            const ordersResponse = await getAllOrders();
            if (ordersResponse?.status === 'success') {
                setOrders(ordersResponse.data.orders);
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

    return <OrdersSection passOrders={orders} />;
};

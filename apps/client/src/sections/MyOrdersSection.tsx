'use client';

import { getOrders } from '@/src/lib/api';
import { IOrder } from '@/src/types';
import { useEffect, useState } from 'react';
import { Title } from '../components/Title';

const statusColor: Record<string, string> = {
    preparing: 'bg-yellow-100 text-yellow-800',
    'in delivery': 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
};

export const MyOrdersSection = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyOrders = async () => {
            const response = await getOrders();
            if (response?.status === 'success') {
                setOrders(response.data.orders);
            }
            setLoading(false);
        };
        fetchMyOrders();
    }, []);

    if (loading) {
        return (
            <div className="my-16" id="my-orders">
                <Title title="My Orders" description="Your order history." />
                <p className="mt-4 text-textGray text-center">Loading...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="my-16" id="my-orders">
                <Title title="My Orders" description="Your order history." />
                <p className="mt-4 text-textGray text-center">You haven't placed any orders yet.</p>
            </div>
        );
    }

    return (
        <div className="my-16" id="my-orders">
            <Title title="My Orders" description="Your order history." />
            <div className="mt-6 flex flex-col gap-4">
                {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                        {/* Order header */}
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-black text-sm">Order #{order.id}</span>
                            <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                                    statusColor[order.status] ?? 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        {/* Pizzas */}
                        <div className="flex flex-col gap-1 mb-3">
                            {order.pizzas.map((pizza, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="text-black">
                                        {pizza.name}{' '}
                                        <span className="text-textGray capitalize">
                                            ({pizza.size}, {pizza.dough}) × {pizza.amount}
                                        </span>
                                    </span>
                                    <span className="text-black font-medium">${pizza.totalPrice}</span>
                                </div>
                            ))}
                        </div>

                        {/* Delivery details */}
                        <div className="text-xs text-textGray border-t border-gray-100 pt-2 flex justify-between">
                            <span>
                                {order.deliveryDetails.street} {order.deliveryDetails.houseNumber},{' '}
                                {order.deliveryDetails.city}
                            </span>
                            <span className="font-bold text-black text-sm">Total: ${order.totalPrice}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

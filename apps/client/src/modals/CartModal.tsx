'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';
import { Button } from '../components/Button';
import { Counter } from '../components/Counter';
import { Error } from '../components/Error';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { Title } from '../components/Title';
import { Toast } from '../components/Toast';
import { createOrder } from '../lib/api';
import { useStore } from '../store';

type Props = {
    onClose?: () => void;
};

export const CartModal = ({ onClose }: Props) => {
    const [error, setError] = useState('');
    const { pizzas, changeAmount, removeFromCart, clearCart } = useStore();

    const schema = z.object({
        name: z.string().min(1, 'Name is required'),
        phoneNumber: z.string().min(1, 'Phone number is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.TypeOf<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit(async (data) => {
        const parsedPizzas = pizzas.map((pizza) => ({ ...pizza, totalPrice: pizza.price * pizza.amount }));

        const response = await createOrder(parsedPizzas, {
            name: data.name,
            phoneNumber: data.phoneNumber,
            street: 'pickup',
            houseNumber: 'pickup',
            city: 'pickup',
        });

        if (response?.status === 'success') {
            clearCart();
            if (onClose) onClose();
            toast(<Toast text={response.message} />);
        } else {
            setError(response?.message);
        }
    });

    const counterChange = (id: number, amount: number) => {
        if (amount === 0) {
            removeFromCart(id);
        } else {
            changeAmount(id, amount);
        }
    };

    const totalPrice = pizzas.reduce((sum, p) => sum + p.price * p.amount, 0);

    const styles = ['flex-1', 'w-20 justify-center items-center flex', 'w-20 justify-center items-center flex'];
    const head = ['pizza name, ingredients', 'amount', 'price'];

    const rows = pizzas.map((pizza, index) => [
        <>
            <span className="text-black font-bold text-sm">{`${pizza.name}, ${pizza.size}, ${pizza.dough}`}</span>
            <br />
            {pizza.ingredients}
        </>,
        <Counter
            key={index}
            scheme="white"
            onChange={(count) => counterChange(pizza.id, count)}
            value={pizza.amount}
            min={0}
            max={5}
        />,
        `$${pizza.price * pizza.amount}`,
    ]);

    return (
        <Modal onClose={onClose} addBackground={true}>
            <Title title="Cart" description="Review your order." />

            {/* Empty cart state */}
            {pizzas.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-black font-bold text-lg">Your cart is empty</p>
                    <p className="text-textGray text-sm mt-1">Add some delicious pizzas to get started!</p>
                    <div className="mt-6">
                        <Button variant="primary" type="button" onClick={onClose}>
                            Browse Menu
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="mt-4">
                        <Table head={head} rows={rows} styles={styles} />
                    </div>

                    {/* Total */}
                    <div className="mt-3 flex justify-end">
                        <p className="text-black font-bold text-base">Total: <span className="text-primary">${totalPrice}</span></p>
                    </div>

                    {/* Pickup notice */}
                    <div className="mt-4 bg-backgroundGray rounded-lg p-3 flex items-start gap-3">
                        <span className="text-2xl">🏪</span>
                        <div>
                            <p className="text-black font-semibold text-sm">Pickup Only</p>
                            <p className="text-textGray text-xs mt-0.5">500 Can-Amera Pkwy Unit E, Cambridge, ON N1T 2H2</p>
                            <p className="text-textGray text-xs">📞 (519) 621-7774</p>
                        </div>
                    </div>

                    {/* Contact details */}
                    <div className="mt-4">
                        <Title title="Your Details" description="So we can prepare your order." />
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="mt-3 flex gap-2">
                            <div className="w-full">
                                <Input placeholder="Your name" {...register('name')} />
                                {errors.name?.message && <Error>{errors.name.message}</Error>}
                            </div>
                            <div className="w-full">
                                <Input placeholder="Phone number" {...register('phoneNumber')} />
                                {errors.phoneNumber?.message && <Error>{errors.phoneNumber.message}</Error>}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <Button variant="white" type="button" onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Place Order
                            </Button>
                        </div>
                        <div className={twMerge('text-right mt-1', !error && 'hidden')}>
                            <Error>{error}</Error>
                        </div>
                    </form>
                </>
            )}
        </Modal>
    );
};

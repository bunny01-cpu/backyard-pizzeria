'use client';

import { AddPizzaModal } from '@/src/modals/AddPizzaModal';
import { IPizza } from '@/src/types';
import { useState } from 'react';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { Table } from '../components/Table';
import { Title } from '../components/Title';

const CATEGORIES = ['special pizza', 'custom pizza', 'dips', 'drinks'];

type Props = {
    pizzas: IPizza[];
};

export const MenuSection = ({ pizzas }: Props) => {
    const [selectedPizza, setSelectedPizza] = useState<IPizza | null>(null);

    const styles = [
        'flex-1',
        'w-20 justify-center items-center flex sm:hidden',
        'w-20 justify-center items-center hidden sm:flex',
        'w-20 justify-center items-center hidden sm:flex',
        'w-20 justify-center items-center hidden sm:flex',
        'w-20 justify-center items-center flex',
    ];

    const head = ['pizza name, ingredients', 'price', 'small', 'medium', 'large', 'buy'];

    const buildRows = (items: IPizza[]) =>
        items.map((pizza) => [
            <div key={pizza.id} className="flex items-center gap-3">
                {pizza.image && (
                    <img src={pizza.image} alt={pizza.name} className="w-12 h-12 object-cover rounded flex-shrink-0" />
                )}
                <div>
                    <span className="text-black font-bold text-sm">{pizza.name}</span>
                    <br />
                    <span className="text-textGray text-sm">{pizza.ingredients}</span>
                </div>
            </div>,
            `$${pizza.prices.small}`,
            `$${pizza.prices.small}`,
            `$${pizza.prices.medium}`,
            `$${pizza.prices.large}`,
            <RiShoppingCart2Line
                key={pizza.id}
                className="text-textGray text-2xl cursor-pointer"
                onClick={() => setSelectedPizza(pizza)}
                data-testid="add-pizza-button"
            />,
        ]);

    // Only show categories that have at least one pizza
    const activeCategories = CATEGORIES.filter((cat) =>
        pizzas.some((p) => (p.category ?? 'special pizza') === cat)
    );

    return (
        <div className="my-16" id="menu">
            {selectedPizza && <AddPizzaModal pizza={selectedPizza} onClose={() => setSelectedPizza(null)} />}
            <Title title="Menu" description="Check our pizza menu." />

            {activeCategories.length === 0 && (
                <div className="mt-4 text-textGray text-center">No items on the menu yet.</div>
            )}

            {activeCategories.map((cat) => {
                const items = pizzas.filter((p) => (p.category ?? 'special pizza') === cat);
                return (
                    <div key={cat} className="mt-10">
                        <h2 className="text-xl font-bold text-black capitalize border-b-2 border-primary pb-2 mb-4">
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </h2>
                        <Table head={head} rows={buildRows(items)} styles={styles} />
                    </div>
                );
            })}
        </div>
    );
};

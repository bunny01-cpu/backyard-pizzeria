'use client';

import { AddPizzaModal } from '@/src/modals/AddPizzaModal';
import { IPizza } from '@/src/types';
import { useState } from 'react';
import { RiSearchLine, RiShoppingCart2Line } from 'react-icons/ri';
import { Title } from '../components/Title';

const CATEGORIES = ['special pizza', 'custom pizza', 'dips', 'drinks'];

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23fafafa'/%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' dominant-baseline='middle'%3E🍕%3C/text%3E%3C/svg%3E";

type Props = {
    pizzas: IPizza[];
};

export const MenuSection = ({ pizzas }: Props) => {
    const [selectedPizza, setSelectedPizza] = useState<IPizza | null>(null);
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const activeCategories = CATEGORIES.filter((cat) =>
        pizzas.some((p) => (p.category ?? 'special pizza') === cat)
    );

    const filteredPizzas = pizzas.filter((p) => {
        const matchesSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.ingredients.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
            activeFilter === 'all' || (p.category ?? 'special pizza') === activeFilter;
        return matchesSearch && matchesCategory;
    });

    const categoriesToShow =
        activeFilter === 'all'
            ? activeCategories.filter((cat) => filteredPizzas.some((p) => (p.category ?? 'special pizza') === cat))
            : activeCategories.filter((cat) => cat === activeFilter);

    return (
        <div className="my-16" id="menu">
            {selectedPizza && <AddPizzaModal pizza={selectedPizza} onClose={() => setSelectedPizza(null)} />}
            <Title title="Menu" description="Check our pizza menu." />

            {/* Search + Filter bar */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                    <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-textGray text-lg" />
                    <input
                        type="text"
                        placeholder="Search pizzas..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-backgroundGray rounded-lg text-black text-sm outline-none focus:ring-2 focus:ring-primary placeholder:text-textGray"
                    />
                </div>

                {/* Category filter pills */}
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeFilter === 'all'
                                ? 'bg-primary text-white'
                                : 'bg-backgroundGray text-textGray hover:bg-gray-200'
                        }`}
                    >
                        All
                    </button>
                    {activeCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                                activeFilter === cat
                                    ? 'bg-primary text-white'
                                    : 'bg-backgroundGray text-textGray hover:bg-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* No results */}
            {filteredPizzas.length === 0 && (
                <div className="mt-12 text-center">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="text-black font-semibold">No pizzas found</p>
                    <p className="text-textGray text-sm mt-1">Try a different search or category</p>
                    <button
                        onClick={() => { setSearch(''); setActiveFilter('all'); }}
                        className="mt-4 text-primary text-sm underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}

            {/* Pizza cards by category */}
            {categoriesToShow.map((cat) => {
                const items = filteredPizzas.filter((p) => (p.category ?? 'special pizza') === cat);
                if (items.length === 0) return null;
                return (
                    <div key={cat} className="mt-10">
                        <h2 className="text-xl font-bold text-black capitalize border-b-2 border-primary pb-2 mb-6">
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {items.map((pizza) => (
                                <div
                                    key={pizza.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col"
                                >
                                    <div className="relative h-44 bg-backgroundGray overflow-hidden">
                                        <img
                                            src={pizza.image || PLACEHOLDER}
                                            alt={pizza.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="text-black font-bold text-base">{pizza.name}</h3>
                                        <p className="text-textGray text-xs mt-1 flex-1 line-clamp-2">{pizza.ingredients}</p>
                                        <div className="flex gap-2 mt-3">
                                            {[
                                                { label: 'S', price: pizza.prices.small },
                                                { label: 'M', price: pizza.prices.medium },
                                                { label: 'L', price: pizza.prices.large },
                                            ].map(({ label, price }) => (
                                                <div key={label} className="flex-1 bg-backgroundGray rounded-lg py-1 text-center">
                                                    <p className="text-xs text-textGray">{label}</p>
                                                    <p className="text-black font-semibold text-sm">${price}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setSelectedPizza(pizza)}
                                            data-testid="add-pizza-button"
                                            className="mt-4 w-full bg-primary text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all duration-150"
                                        >
                                            <RiShoppingCart2Line className="text-lg" />
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

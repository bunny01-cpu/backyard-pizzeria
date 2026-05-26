'use client';

import dynamic from 'next/dynamic';
import { Title } from '../components/Title';

const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
});

export const AboutUsSection = () => {
    // 500 Can-Amera Pkwy, Cambridge, ON
    const position: [number, number] = [43.3965, -80.3522];

    return (
        <div className="my-16">
            <Title title="About us" description="More information about us." />
            <div className="mt-4">
                <div className="block md:flex">
                    <div className="flex-1 bg-backgroundGray text-textGray p-2 rounded flex flex-col justify-between md:mr-4">
                        <div>
                            <p className="text-black font-bold text-lg mb-2">Welcome to The Backyard Pizzeria</p>
                            <p className="mb-3">
                                Nestled in the heart of Cambridge, Ontario, The Backyard Pizzeria is where great
                                ingredients meet even greater passion. We believe pizza is more than just food —
                                it&apos;s a gathering, a celebration, and a little slice of joy in every bite.
                            </p>
                            <p className="mb-3">
                                Every pizza we craft starts with hand-stretched dough, slow-simmered tomato sauce,
                                and the freshest toppings sourced locally whenever possible. Whether you&apos;re
                                craving a classic Margherita or something bold and custom-built, our kitchen is
                                ready to deliver something unforgettable.
                            </p>
                            <p>
                                From our backyard to your table — made with love, served with pride.
                            </p>
                        </div>
                        <div className="mt-6 border-t border-gray-200 pt-4">
                            <p className="font-semibold text-black">📍 Find Us</p>
                            <p className="mt-1">500 Can-Amera Pkwy Unit E</p>
                            <p>Cambridge, ON N1T 2H2</p>
                            <p className="mt-2 font-semibold text-black">📞 Call Us</p>
                            <p className="mt-1">
                                <a href="tel:5196217774" className="hover:underline">(519) 621-7774</a>
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-[300px] mt-4 md:w-[500px] md:mt-0 rounded overflow-hidden">
                        <Map position={position} />
                    </div>
                </div>
            </div>
        </div>
    );
};

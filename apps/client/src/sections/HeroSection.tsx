'use client';

import Image from 'next/image';
import { Button } from '../components/Button';

export const HeroSection = () => {
    return (
        <div className="flex justify-between h-[480px] relative">
            <div className="w-full shrink-0 mt-24 flex flex-col items-center md:block md:w-auto">
                {/* Phone number badge - top right on mobile, inline on desktop */}
                <div className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit">
                    <span>📞</span>
                    <a href="tel:5196217774">(519) 621-7774</a>
                </div>

                <h2 className="text-5xl text-black text-center font-bold max-w-sm md:text-left leading-tight">
                    Fired with love,<br />
                    <span className="text-primary">served with soul.</span>
                </h2>
                <p className="text-textGray text-center font-medium mt-4 md:text-left">
                    Handcrafted pizzas made with the freshest local ingredients.
                </p>
                <p className="text-textGray text-center text-sm mt-1 md:text-left">
                    📍 500 Can-Amera Pkwy Unit E, Cambridge, ON
                </p>
                <div className="mt-6">
                    <Button variant="primary" onClick={() => document.querySelector('#menu')?.scrollIntoView()}>
                        Order now
                    </Button>
                </div>
            </div>
            <div className="hidden md:block self-center">
                <Image src="/hero-image.png" alt="Pizza image" width="460" height="280" priority />
            </div>
        </div>
    );
};

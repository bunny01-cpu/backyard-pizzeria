'use client';

import Image from 'next/image';
import { Button } from '../components/Button';

export const HeroSection = () => {
    return (
        <div className="flex justify-between h-[512px] relative">
            {/* Green accent stripe at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-700 opacity-80" />
            <div className="w-full shrink-0 mt-32 flex flex-col items-center md:block md:w-auto">
                <h2 className="text-5xl text-white text-center font-bold max-w-xs md:text-left leading-tight">
                    Fired with love,<br />served with soul.
                </h2>
                <p className="text-white text-center font-medium mt-4 md:text-left opacity-90">
                    Handcrafted pizzas made with the freshest local ingredients.
                </p>
                <p className="text-white text-center text-sm mt-1 md:text-left opacity-70">
                    500 Can-Amera Pkwy Unit E, Cambridge, ON
                </p>
                <div className="mt-6 flex gap-3">
                    <Button variant="white" onClick={() => document.querySelector('#menu')?.scrollIntoView()}>
                        Order now
                    </Button>
                    <a href="tel:5196217774">
                        <Button variant="outline">
                            📞 (519) 621-7774
                        </Button>
                    </a>
                </div>
            </div>
            <div className="hidden md:block self-center">
                <Image src="/hero-image.png" alt="Pizza image" width="500" height="300" priority />
            </div>
        </div>
    );
};

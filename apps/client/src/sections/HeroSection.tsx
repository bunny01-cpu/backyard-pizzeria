'use client';

import Image from 'next/image';
import { Button } from '../components/Button';

export const HeroSection = () => {
    return (
        <div className="flex justify-between h-[512px] relative overflow-hidden">

            {/* Pizza image as background on mobile, hidden on desktop */}
            <div className="absolute inset-0 md:hidden">
                <Image
                    src="/hero-image.png"
                    alt="Pizza"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full shrink-0 mt-28 flex flex-col items-center md:block md:w-auto">
                <h2 className="text-5xl text-white text-center font-bold max-w-xs md:text-left">
                    Fired with love, served with soul.
                </h2>
                <p className="text-white text-center font-medium mt-4 md:text-left opacity-90">
                    Handcrafted pizzas made with the freshest local ingredients.
                </p>
                <p className="text-white text-center text-sm mt-2 md:text-left opacity-80">
                    📍 500 Can-Amera Pkwy Unit E, Cambridge, ON
                </p>
                <a
                    href="tel:5196217774"
                    className="text-white text-center text-sm mt-1 md:text-left opacity-80 hover:opacity-100 hover:underline block"
                >
                    📞 (519) 621-7774
                </a>
                <div className="mt-5">
                    <Button variant="white" onClick={() => document.querySelector('#menu')?.scrollIntoView()}>
                        Order now
                    </Button>
                </div>
            </div>

            {/* Pizza image on desktop - side by side */}
            <div className="hidden md:block self-center flex-shrink-0">
                <Image src="/hero-image.png" alt="Pizza image" width="500" height="300" priority />
            </div>

        </div>
    );
};

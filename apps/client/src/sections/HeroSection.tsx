'use client';

import Image from 'next/image';
import { Button } from '../components/Button';

export const HeroSection = () => {
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:h-[512px] py-10 md:py-0">

            {/* Text content */}
            <div className="flex flex-col items-center md:items-start md:justify-center md:mt-0">
                <h2 className="text-4xl md:text-5xl text-white text-center font-bold max-w-xs md:text-left">
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

            {/* Pizza image — below text on mobile, side on desktop */}
            <div className="flex justify-center mt-8 md:mt-0 md:self-center">
                <Image
                    src="/hero-image.png"
                    alt="Pizza image"
                    width={400}
                    height={240}
                    priority
                    className="w-72 md:w-[500px]"
                />
            </div>

        </div>
    );
};

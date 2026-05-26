'use client';

export const Footer = () => {
    return (
        <div className="py-6 flex flex-col items-center justify-center gap-1">
            <p className="text-white font-bold text-lg">The Backyard Pizzeria</p>
            <p className="text-white text-sm opacity-80">500 Can-Amera Pkwy Unit E, Cambridge, ON N1T 2H2</p>
            <p className="text-white text-sm opacity-80">
                <a href="tel:5196217774" className="hover:underline">(519) 621-7774</a>
            </p>
            <p className="text-white text-sm opacity-60 mt-2">© {new Date().getFullYear()} The Backyard Pizzeria. All rights reserved.</p>
        </div>
    );
};

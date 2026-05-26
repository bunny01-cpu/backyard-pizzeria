'use client';

export const Footer = () => {
    return (
        <div>
            {/* Italian flag accent */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #007A33 33%, #ffffff 33%, #ffffff 66%, #C8102E 66%)' }} />
            <div className="py-6 flex flex-col items-center justify-center gap-1 bg-primary">
                <img src="/logo.png" alt="The Backyard Pizzeria" className="h-16 w-16 rounded-full object-cover mb-2" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <p className="text-white font-bold text-lg">The Backyard Pizzeria</p>
                <p className="text-white text-sm opacity-90">500 Can-Amera Pkwy Unit E, Cambridge, ON N1T 2H2</p>
                <p className="text-white text-sm opacity-90">
                    <a href="tel:5196217774" className="hover:underline">📞 (519) 621-7774</a>
                </p>
                <p className="text-white text-xs opacity-60 mt-2">© {new Date().getFullYear()} The Backyard Pizzeria. All rights reserved.</p>
            </div>
        </div>
    );
};

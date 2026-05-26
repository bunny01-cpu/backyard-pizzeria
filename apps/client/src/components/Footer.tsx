'use client';

export const Footer = () => {
    return (
        <div>
            {/* Business card style footer */}
            <div className="bg-white border border-gray-200 shadow-inner py-8 px-4">
                {/* Pizza pattern background overlay */}
                <div className="max-w-5xl mx-auto">
                    {/* Logo + name center */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="h-24 w-24 rounded-full border-4 border-primary bg-white flex items-center justify-center shadow-lg mb-3 relative overflow-hidden">
                            {/* Green top arc */}
                            <div className="absolute top-0 left-0 right-0 h-8 bg-green-600 rounded-t-full" />
                            {/* Red bottom arc */}
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-primary rounded-b-full" />
                            <span className="text-4xl relative z-10">🍕</span>
                        </div>
                        <p className="text-black font-bold text-2xl italic">The</p>
                        <p className="text-black font-bold text-3xl italic -mt-1">Backyard Pizzeria</p>
                    </div>

                    {/* Divider */}
                    <div className="h-1 w-full mb-6" style={{ background: 'linear-gradient(to right, #16a34a 33%, #ffffff 33%, #ffffff 66%, #C8102E 66%)' }} />

                    {/* Info row */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        {/* Phone */}
                        <a
                            href="tel:5196217774"
                            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
                        >
                            📞 (519) 621-7774
                        </a>

                        {/* Address */}
                        <div className="flex items-center gap-2 text-gray-600 text-center">
                            <span className="text-primary text-lg">📍</span>
                            <span className="font-medium">500 Can-Amera Pkwy Unit E, Cambridge, ON N1T 2H2</span>
                        </div>
                    </div>

                    {/* Red address bar like business card */}
                    <div className="mt-6 bg-primary text-white text-center py-3 rounded-lg font-semibold text-sm">
                        📍 500 Can-Amera Pkwy Unit E, Cambridge, ON N1T 2H2
                    </div>

                    <p className="text-center text-gray-400 text-xs mt-4">
                        © {new Date().getFullYear()} The Backyard Pizzeria. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

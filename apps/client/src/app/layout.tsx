import { Metadata } from 'next';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { poppins } from '../lib/fonts';
import '../styles/globals.css';

export const metadata: Metadata = {
    title: {
        default: 'The Backyard Pizzeria',
        template: 'The Backyard Pizzeria - %s',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={poppins.variable}>
            <body suppressHydrationWarning={true}>
                {children}
                <ToastContainer
                    position="bottom-left"
                    hideProgressBar={true}
                    closeButton={false}
                    draggable={false}
                    transition={Slide}
                />
            </body>
        </html>
    );
}

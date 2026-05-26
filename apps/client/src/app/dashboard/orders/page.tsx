import { Header } from '@/src/components//Header';
import { User } from '@/src/components/User';
import { Wrapper } from '@/src/components/Wrapper';
import { fetchSetup } from '@/src/lib/fetch';
import { OrdersDashboardClient } from '@/src/components/OrdersDashboardClient';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default async function Orders() {
    const isSetup = await fetchSetup();

    if (!isSetup) {
        redirect('/dashboard/register');
    }

    return (
        <User>
            <Wrapper variant="black">
                <Header isDashboard={true} />
            </Wrapper>
            <Wrapper variant="gray">
                <div className="h-[calc(100vh-80px)]">
                    <OrdersDashboardClient />
                </div>
            </Wrapper>
        </User>
    );
}

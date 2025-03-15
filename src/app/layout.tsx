import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactQueryProvider } from '@/src/app/react-query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserProvider } from '@/src/contexts/user.context';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/components/common/layouts/root-layout.module.scss';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    variable: '--font-montserrat'
});

export const metadata: Metadata = {
    title: 'DishMatcher',
    description: 'Dowiedz się, co dziś ugotować',
    icons: '/logo.svg'
};

export default function RootLayout({ children }: Readonly<{children: ReactNode;}>) {
    const bodyClassName = [montserrat.variable, styles['root-layout']].join(' ');

    return (
        <html lang="pl">
            <head>
                <title>{metadata.title as string}</title>
                <link rel="icon" href="favicon.ico" />
            </head>
            <body className={bodyClassName}>
                <UserProvider>
                    <ReactQueryProvider>
                        <AppRouterCacheProvider>
                            {children}
                            <ToastContainer />
                        </AppRouterCacheProvider>
                        <ReactQueryDevtools />
                    </ReactQueryProvider>
                </UserProvider>
            </body>
        </html>
    );
}

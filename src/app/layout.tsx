import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactQueryProvider } from '@/src/app/react-query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserProvider } from '@/src/contexts/user.context';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Co na dziś?',
    description: 'Dowiedz się, co dziś ugotować'
};

export default function RootLayout({ children }: Readonly<{children: ReactNode;}>) {
    return (
        <html lang="pl">
            <head>
                <title>{metadata.title as string}</title>
                <link rel="icon" href="favicon.ico" />
            </head>
            <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactQueryProvider } from '@/src/app/react-query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Yummy',
    description: 'Find out what to cook today'
};

export default function RootLayout({ children }: Readonly<{children: ReactNode;}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="favicon.ico" />
            </head>
            <body className={inter.className}>
                <ReactQueryProvider>
                    <AppRouterCacheProvider>
                        {children}
                    </AppRouterCacheProvider>
                    <ReactQueryDevtools />
                </ReactQueryProvider>
            </body>
        </html>
    );
}

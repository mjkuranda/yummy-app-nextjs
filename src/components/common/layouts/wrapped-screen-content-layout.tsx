import styles from '@/styles/components/common/layouts/wrapped-screen-content-layout.module.scss';
import { ReactNode } from 'react';
import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';

interface WrappedScreenContentLayoutProps {
    children: ReactNode;
}

export function WrappedScreenContentLayout({ children }: WrappedScreenContentLayoutProps) {
    return (
        <div className={styles['page-container']}>
            <Header />
            <div className={styles['children-container']}>
                {children}
            </div>
            <Footer />
        </div>
    );
}
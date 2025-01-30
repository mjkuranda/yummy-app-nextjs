import styles from '@/styles/components/common/layouts/wrapped-content-layout.module.scss';
import { ReactNode } from 'react';
import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';

interface WrappedContentLayoutProps {
    children: ReactNode;
}

export function WrappedContentLayout({ children }: WrappedContentLayoutProps) {
    return (
        <div className={styles['page-container']}>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
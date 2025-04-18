import styles from '@/styles/components/common/layouts/wrapped-content-layout.module.scss';
import { CSSProperties, ReactNode } from 'react';
import { Header } from '@/src/components/common/header/header';
import { Footer } from '@/src/components/common/footer';

interface WrappedContentLayoutProps {
    children: ReactNode;
    style?: CSSProperties;
}

export function WrappedContentLayout({ children, style }: WrappedContentLayoutProps) {
    return (
        <main className={styles['page-container']}>
            <Header />
            <div style={style}>
                {children}
            </div>
            <Footer />
        </main>
    );
}
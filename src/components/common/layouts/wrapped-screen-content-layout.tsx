import styles from '@/styles/components/common/layouts/wrapped-screen-content-layout.module.scss';
import { ReactNode } from 'react';
import { Header } from '@/src/components/common/header/header';
import { Footer } from '@/src/components/common/footer';

interface WrappedScreenContentLayoutProps {
    children: ReactNode;
    type?: 'multi-content';
}

export function WrappedScreenContentLayout({ children, type }: WrappedScreenContentLayoutProps) {
    return (
        <main className={styles['page-container']}>
            <Header />
            <div className={styles['children-container']} data-type={type}>
                {type === 'multi-content'
                    ? <div>{children}</div>
                    : <>{children}</>
                }
            </div>
            <Footer />
        </main>
    );
}
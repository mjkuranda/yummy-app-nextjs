import styles from '@/styles/components/common/layouts/screen-content-layout.module.scss';
import { ReactNode } from 'react';

interface ScreenContentLayoutProps {
    children: ReactNode;
}

export function ScreenContentLayout({ children }: ScreenContentLayoutProps) {
    return (
        <main className={styles['page-container']}>
            {children}
        </main>
    );
}
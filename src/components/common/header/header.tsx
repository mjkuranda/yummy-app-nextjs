'use client';

import styles from '@/styles/components/common/header/header.module.scss';
import { useAppView } from '@/src/hooks/use-app-view';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('@/src/components/common/sidebar/sidebar'), { ssr: false });
const Nav = dynamic(() => import('@/src/components/common/header/nav'), { ssr: false });

interface HeaderProps {
    isTransparent?: boolean;
}

export function Header({ isTransparent }: HeaderProps) {
    const { isMobile } = useAppView();

    return (
        <header className={styles['header-container']} data-background-transparent={isTransparent}>
            <div className={styles['brand-container']}>
                <div id={styles.logo}>
                    <img
                        src="/logo.svg"
                        width="64px"
                        height="64px"
                        alt="Yummy icon"
                    />
                </div>
                <h1>DishMatcher</h1>
            </div>
            {isMobile ? <Sidebar /> : <Nav />}
        </header>
    );
}
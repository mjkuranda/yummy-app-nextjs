import styles from '@/styles/components/common/header.module.scss';
import { User } from '@/src/components/common/user';
import { PageLink } from '@/src/components/common/page-link';

interface HeaderProps {
    isTransparent?: boolean;
}

export function Header({ isTransparent }: HeaderProps) {
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
            <div className={styles['link-container']}>
                <PageLink href={'/'} label={'Strona główna'} />
                <PageLink href={'/#description'} label={'O stronie'} />
            </div>
            <div className={styles['user-container']}>
                <User />
            </div>
        </header>
    );
}
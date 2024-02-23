import styles from '@/styles/components/common/header.module.scss';
import { User } from '@/src/components/common/user';
import Link from 'next/link';

export function Header() {
    return (
        <header className={styles['app-header']}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                    <div id={styles.logo}>
                        <img
                            src="/yummy.ico"
                            width="64px"
                            height="64px"
                            alt="Yummy icon"
                        />
                    </div>
                    <h1>Yummy</h1>
                </div>
                <div className="d-flex justify-content-around align-items-center">
                    <nav className="d-flex justify-content-between align-items-center">
                        <Link href="/">Strona główna</Link>
                        <Link href="/#description">O stronie</Link>
                    </nav>
                    <User />
                </div>
            </div>
        </header>
    );
}
import styles from '@/styles/app/user-bar.module.scss';
import Link from 'next/link';

export function UserBar() {
    return (
        <div className={styles['user-bar']}>
            <Link href="/login">Login</Link>
        </div>
    );
}
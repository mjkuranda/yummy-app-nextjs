import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import Link from 'next/link';
import styles from '@/styles/app/not-found.module.scss';

export default function NotFound() {
    return (
        <div className={styles['not-found']}>
            <Header />
            <div className={styles['not-found__info']}>This page does not exist. Go to&nbsp;<Link href="/">main</Link>&nbsp;page.</div>
            <Footer />
        </div>
    );
}
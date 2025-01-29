import styles from '@/styles/components/common/footer.module.scss';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className={styles['app-footer']}>
            <div>
                <p>Wszelkie prawa zastrzeżone</p>
                <div className={styles['author-information']}>
                    <h3>Marek Kurańda</h3>
                    <h4>DishMatcher &copy; 2025</h4>
                </div>
                <h5>
                    <Link href="https://icons8.com/icon/RxvLC54xtSnZ/yummy" rel="noopener noreferrer" target="_blank">Yummy</Link>
                    &nbsp;ikona pochodzi z&nbsp;
                    <Link href="https://icons8.com" rel="noopener noreferrer" target="_blank">Icons8</Link>
                </h5>
            </div>
        </footer>
    );
}
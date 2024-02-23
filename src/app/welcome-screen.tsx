import styles from '@/styles/app/welcome-screen.module.scss';
import { WelcomeScreenPanel } from '@/src/app/welcome-screen-panel';

export function WelcomeScreen() {
    return (
        <main className={styles['welcome-screen']}>
            <WelcomeScreenPanel />
        </main>
    );
}
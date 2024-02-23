import styles from '@/styles/app/welcome-screen.module.scss';
import { WelcomeScreenPanel } from '@/src/app/welcome-screen-panel';
import { UserBar } from '@/src/app/user-bar';

export function WelcomeScreen() {
    return (
        <main className={styles['welcome-screen']}>
            <WelcomeScreenPanel />
            <UserBar />
        </main>
    );
}
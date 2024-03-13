import styles from '@/styles/app/welcome-screen.module.scss';
import { WelcomeScreenPanel } from '@/src/app/welcome-screen-panel';
import { User } from '@/src/components/common/user';

export function WelcomeScreen() {
    return (
        <main className={styles['welcome-screen']}>
            <WelcomeScreenPanel />
            <div className="position-absolute top-0 end-0 mt-4 me-4">
                <User />
            </div>
        </main>
    );
}
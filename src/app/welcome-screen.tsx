import styles from '@/styles/app/welcome-screen.module.scss';
import { WelcomeScreenPanel } from '@/src/app/welcome-screen-panel';
import { User } from '@/src/components/common/user';

export function WelcomeScreen() {
    return (
        <main className={styles['welcome-screen']}>
            <WelcomeScreenPanel />
            <div className="position-absolute top-0 end-0 mt-3 me-5">
                <User />
            </div>
        </main>
    );
}
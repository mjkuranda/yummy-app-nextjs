import styles from '@/styles/app/welcome-screen.module.scss';
import { Button } from '@/src/components/common/button';
import { UserProfileHelper } from '@/src/helpers/user-profile.helper';

export function WelcomeScreenPanel() {
    const className = `${styles['panel']} d-flex justify-content-center align-items-center flex-column`;

    return (
        <div className={className}>
            <h1 className={styles['header-panel']}>Yummy</h1>
            <div>
                <Button label={'Szukaj po składnikach'} link={'/search'} />
                <Button label={'Propozycja dnia'} link={'/meal-proposal'} disabled={!UserProfileHelper.isLoggedIn()} />
            </div>
        </div>
    );
}
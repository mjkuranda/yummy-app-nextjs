'use client';

import styles from '@/styles/app/welcome-screen.module.scss';
import { Button } from '@/src/components/common/button';
import { useUserContext } from '@/src/contexts/user.context';

export function WelcomeScreenPanel() {
    const className = `${styles['panel']} d-flex justify-content-center align-items-center flex-column`;
    const { isLoggedIn } = useUserContext();

    return (
        <div className={className}>
            <h1 className={styles['header-panel']}>Yummy</h1>
            <div>
                <Button label={'Szukaj po składnikach'} link={'/search'} />
                <Button label={'Propozycja dnia'} link={'/meal-proposal'} disabled={!isLoggedIn()} />
            </div>
        </div>
    );
}
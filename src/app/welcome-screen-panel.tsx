'use client';

import styles from '@/styles/app/welcome-screen.module.scss';
import { Button } from '@/src/components/common/button';
import { TopHeader } from '@/src/components/common/top-header';
import { useUserContext } from '@/src/contexts/user.context';

export function WelcomeScreenPanel() {
    const { isLoggedIn } = useUserContext();

    return (
        <div className={styles['welcome-screen__panel']}>
            <TopHeader />
            <div className={styles['welcome-screen__panel-content']}>
                <div className={styles['welcome-screen__panel-content-details']}>
                    <h2>Brak pomysłu na danie?</h2>
                    <p>Wyszukaj dania na podstawie wprowadzonych składników - tych,<br /> z których chcesz przygotować swoje danie lub które znajdują się<br /> u Ciebie w lodówce.</p>
                    <div className={styles['main-navigator-container']}>
                        <Button label={'Szukaj po składnikach'} icon="search" link={'/search'} width={300} />
                        {isLoggedIn() && <Button label={'Propozycja dnia'} icon="best search" link={'/recommendations'} width={300} />}
                    </div>
                </div>
                <div className={styles['welcome-screen__panel-content-image']}></div>
            </div>
        </div>
    );
}
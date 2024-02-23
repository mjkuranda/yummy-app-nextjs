import styles from '@/styles/app/welcome-screen.module.scss';

export function WelcomeScreenPanel() {
    const className = `${styles['panel']} d-flex justify-content-center align-items-center flex-column`;

    return (
        <div className={className}>
            <h1 className={styles['header-panel']}>Yummy</h1>
            <div>
                <button>Szukaj po składnikach</button>
                <button>Propozycja dnia</button>
            </div>
        </div>
    );
}
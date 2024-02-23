import styles from '@/styles/app/welcome-screen.module.scss';
import { WelcomeScreenPanel } from '@/src/app/welcome-screen-panel';
import { InformationScreen } from '@/src/app/information-screen';

export function WelcomeScreen() {
    return (
        <main className={styles['welcome-screen']}>
            <WelcomeScreenPanel />
            <InformationScreen title="Meals" description="Easy for users. Containing over X meals!" />
            <InformationScreen title="Integrating" description="Creates cooking community." />
            <InformationScreen title="Mealful" description="Integrate various recipesets." />
        </main>
    );
}
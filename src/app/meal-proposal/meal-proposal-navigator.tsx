import styles from '@/styles/app/meal-proposal/page.module.scss';
import { Button } from '@/src/components/common/button';

export function MealProposalNavigator() {
    return (
        <div className={styles['meal-proposal-container__navigator']}>
            <Button label="Next proposal" />
            <Button label="Choose one" />
        </div>
    );
}
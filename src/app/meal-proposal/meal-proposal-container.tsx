import styles from '@/styles/app/meal-proposal/page.module.scss';
import { MealProposal } from '@/src/app/meal-proposal/meal-proposal';
import { MealProposalNavigator } from '@/src/app/meal-proposal/meal-proposal-navigator';

export function MealProposalContainer() {
    return (
        <div className={styles['meal-proposal-container']}>
            <MealProposal />
            <MealProposalNavigator />
        </div>
    );
}
import styles from '@/styles/app/meal-proposal/page.module.scss';
import { MealProposal } from '@/src/types/api.types';

interface MealProposalItemProps {
    proposal: MealProposal;
}

export function MealProposalItem({ proposal }: MealProposalItemProps) {
    return (
        <div className={styles['meal-proposal-container__proposal']}>
            <div className={styles['meal-proposal-container__proposal-image']}>
                <img src="/no-image.png" alt="Meal proposal image" />
            </div>
            <h3 className={styles['meal-proposal-container__proposal-header']}>
                {proposal.title} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            </h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
        </div>
    );
}
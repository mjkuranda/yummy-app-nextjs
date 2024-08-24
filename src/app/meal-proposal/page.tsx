'use client';

import styles from '@/styles/app/meal-proposal/page.module.scss';
import { MealProposalContainer } from '@/src/app/meal-proposal/meal-proposal-container';

export default function MealProposal() {
    return (
        <div className={styles['meal-proposal-page']}>
            <MealProposalContainer />
        </div>
    );
}
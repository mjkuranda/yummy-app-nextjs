'use client';

import styles from '@/styles/app/dish-proposal/page.module.scss';
import { DishProposalContainer } from '@/src/app/dish-proposal/dish-proposal-container';

export default function DishProposal() {
    return (
        <div className={styles['dish-proposal-page']}>
            <DishProposalContainer />
        </div>
    );
}
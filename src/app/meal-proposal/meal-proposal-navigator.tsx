'use client';

import styles from '@/styles/app/meal-proposal/page.module.scss';
import { Button } from '@/src/components/common/button';

interface MealProposalNavigatorProps {
    onNext: () => void;
    onChoose: () => void;
}

export function MealProposalNavigator({ onNext, onChoose }: MealProposalNavigatorProps) {
    return (
        <div className={styles['meal-proposal-container__navigator']}>
            <Button label="Next proposal" onClick={onNext} />
            <Button label="Choose one" onClick={onChoose} />
        </div>
    );
}
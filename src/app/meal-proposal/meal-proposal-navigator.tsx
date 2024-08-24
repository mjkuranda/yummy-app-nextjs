'use client';

import styles from '@/styles/app/meal-proposal/page.module.scss';
import { Button } from '@/src/components/common/button';

interface MealProposalNavigatorProps {
    onPrevious: () => void;
    onNext: () => void;
    onChoose: () => void;
}

export function MealProposalNavigator({ onPrevious, onNext, onChoose }: MealProposalNavigatorProps) {
    return (
        <div className={styles['meal-proposal-container__navigator']}>
            <Button label="Previous" onClick={onPrevious} />
            <Button label="Next" onClick={onNext} />
            <Button label="Choose" onClick={onChoose} />
        </div>
    );
}
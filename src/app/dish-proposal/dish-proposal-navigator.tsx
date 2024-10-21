'use client';

import styles from '@/styles/app/dish-proposal/page.module.scss';
import { Button } from '@/src/components/common/button';

interface DishProposalNavigatorProps {
    onPrevious: () => void;
    onNext: () => void;
    onChoose: () => void;
}

export function DishProposalNavigator({ onPrevious, onNext, onChoose }: DishProposalNavigatorProps) {
    return (
        <div className={styles['dish-proposal-container__navigator']}>
            <Button label="Poprzednia" icon="previous" onClick={onPrevious} />
            <Button label="Następna" icon="next" onClick={onNext} />
            <Button label="Wybierz" icon="details" onClick={onChoose} />
        </div>
    );
}
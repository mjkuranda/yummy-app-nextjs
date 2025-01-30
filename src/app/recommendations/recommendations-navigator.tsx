'use client';

import styles from '@/styles/app/recommendations/page.module.scss';
import { Button } from '@/src/components/common/button';

interface DishProposalNavigatorProps {
    onPrevious: () => void;
    onNext: () => void;
}

export function RecommendationsNavigator({ onPrevious, onNext }: DishProposalNavigatorProps) {
    return (
        <div className={styles['recommendations-container__navigator']}>
            <Button label="Poprzednia" icon="previous" onClick={onPrevious} width={200} />
            <Button label="Następna" icon="next" onClick={onNext} width={200} />
        </div>
    );
}
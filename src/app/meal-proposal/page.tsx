import styles from '@/styles/app/meal-proposal/page.module.scss';
import { MealProposalContainer } from '@/src/app/meal-proposal/meal-proposal-container';
import { MealProposal } from '@/src/types/api.types';

export default function MealProposal() {
    const proposals: MealProposal[] = [
        {
            _id: 'abc123',
            title: 'Meal title 1',
            ingredients: ['carrot'],
            recommendationPoints: 5
        },
        {
            _id: 'abc123',
            title: 'Meal title 2',
            ingredients: ['carrot'],
            recommendationPoints: 5
        },
        {
            _id: 'abc123',
            title: 'Meal title 3',
            ingredients: ['carrot'],
            recommendationPoints: 5
        }
    ];

    return (
        <div className={styles['meal-proposal-page']}>
            <MealProposalContainer proposals={proposals} />
        </div>
    );
}
import styles from '@/styles/app/result/meal-rating.module.scss';
import { MealRatingStars } from '@/src/app/result/[id]/meal-rating-stars';

interface MealRatingProps {
    rating?: number;
    count?: number;
}

// FIXME: Count and optional type
export function MealRating({ rating, count = 50 }: MealRatingProps) {
    return (
        <div className={styles['meal-rating']}>
            <MealRatingStars rating={4.2} />
            <div className={styles['rate-count']}>({count > 0 ? `${count} ocen${count === 1 ? 'a' : ''}` : 'Brak ocen'})</div>
        </div>
    );
}
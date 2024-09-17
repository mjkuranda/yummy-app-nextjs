import styles from '@/styles/app/result/page.module.scss';
import { DetailedMeal } from '@/src/types/api.types';

interface MealDescriptionProps {
    meal: DetailedMeal;
    description?: string;
}

export function MealDescription({ meal, description }: MealDescriptionProps) {
    return (
        <div className={styles['meal-description']}>
            <h5>Opis:</h5>
            <p dangerouslySetInnerHTML={{ __html: description && description.length > 0 ? description : meal.description }} />
        </div>
    );
}
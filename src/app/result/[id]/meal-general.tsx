import styles from '@/styles/app/result/page.module.scss';
import { MealRecipe } from '@/src/app/result/[id]/meal-recipe';
import { DetailedMeal } from '@/src/types/api.types';
import { MealRating } from '@/src/app/result/[id]/meal-rating';

interface MealGeneralProps {
    meal: DetailedMeal;
}

export function MealGeneral({ meal }: MealGeneralProps) {
    return (
        <div className={styles['result-details']}>
            <ul>
                <li>
                    <h3>{meal.title}</h3>
                </li>
                <li>
                    <MealRating />
                </li>
            </ul>
            <div>
                <p dangerouslySetInnerHTML={{ __html: meal.description }} />
                <MealRecipe meal={meal} />
            </div>
        </div>
    );
}
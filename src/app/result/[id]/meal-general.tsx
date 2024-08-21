import styles from '@/styles/app/result/page.module.scss';
import { MealRecipe } from '@/src/app/result/[id]/meal-recipe';
import { DetailedMeal } from '@/src/types/api.types';

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
                    <h4>Wyświetlono X razy</h4>
                </li>
                <li>
                    <h4>Wybrano X razy</h4>
                </li>
            </ul>
            <div>
                <p dangerouslySetInnerHTML={{ __html: meal.description }} />
                <MealRecipe meal={meal} />
            </div>
        </div>
    );
}
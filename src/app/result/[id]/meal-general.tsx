import styles from '@/styles/app/result/page.module.scss';
import { MealRecipe } from '@/src/app/result/[id]/meal-recipe';
import { DetailedMeal, MealRecipeSection, TranslatedIngredient } from '@/src/types/api.types';
import { MealRating } from '@/src/app/result/[id]/meal-rating';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { EditLink } from '@/src/components/common/edit-link';
import { MealTypeText } from '@/src/types/meal.types';
import FlatwareIcon from '@mui/icons-material/Flatware';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { MealIngredients } from '@/src/app/result/[id]/meal-ingredients';
import { MealDescription } from '@/src/app/result/[id]/meal-description';

interface MealGeneralProps {
    meal: DetailedMeal;
    description?: string;
    ingredients?: TranslatedIngredient[];
    recipe?: MealRecipeSection[];
}

export function MealGeneral({ meal, description, ingredients, recipe }: MealGeneralProps) {
    return (
        <div className={styles['result-details']}>
            <ul>
                <li>
                    <div className={styles['result-meal-title']}>
                        <h3>{meal.title}</h3>
                        {meal.language !== 'pl' &&
                            <img
                                src="/uk.png"
                                alt="Flaga UK"
                                width={48}
                                title="Posiłek został przetłumaczony. Może zawierać błędy w tłumaczeniu."
                                data-author={
                                    <a href="https://www.flaticon.com/free-icons/uk-flag" title="uk flag icons">
                                        Uk flag icons created by IconsBox - Flaticon
                                    </a>
                                }
                            />
                        }
                    </div>
                    <div className={styles['information-container']}>
                        <span>Czas wykonania:</span>
                        <span><AccessTimeIcon /></span>
                        <span>{meal.readyInMinutes}</span>
                        <span>minut</span>
                    </div>
                    <div className={styles['information-container']}>
                        <span>Typ posiłku:</span>
                        <span><FlatwareIcon /></span>
                        <span>{MealTypeText[meal.type].pl}</span>
                    </div>
                    <div className={styles['information-container']}>
                        <span>Autor:</span>
                        <span><PersonAddIcon /></span>
                        <span>{meal.sourceOrAuthor}</span>
                    </div>
                </li>
                <li className={styles['result-rating']}>
                    <MealRating />
                    {meal.provider === 'yummy' && <EditLink label={'Edytuj'} link={`/meals/create/${meal.id}`} />}
                </li>
            </ul>
            <div className={styles['meal-details-sections']}>
                <MealDescription description={description} meal={meal} />
                <MealIngredients ingredients={ingredients} meal={meal} />
                <MealRecipe recipe={recipe} meal={meal} />
            </div>
        </div>
    );
}
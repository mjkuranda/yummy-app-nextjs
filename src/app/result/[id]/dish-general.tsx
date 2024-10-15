import styles from '@/styles/app/result/page.module.scss';
import { DishRecipe } from '@/src/app/result/[id]/dish-recipe';
import { DetailedDish, DishRecipeSection, TranslatedIngredient } from '@/src/types/api.types';
import { DishRating } from '@/src/app/result/[id]/dish-rating';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { EditLink } from '@/src/components/common/edit-link';
import { DishTypeText } from '@/src/types/dish.types';
import FlatwareIcon from '@mui/icons-material/Flatware';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { DishIngredients } from '@/src/app/result/[id]/dish-ingredients';
import { DishDescription } from '@/src/app/result/[id]/dish-description';
import { DishDeletion } from '@/src/app/result/[id]/dish-deletion';

interface DishGeneralProps {
    dish: DetailedDish;
    description?: string;
    ingredients?: TranslatedIngredient[];
    recipe?: DishRecipeSection[];
}

export function DishGeneral({ dish, description, ingredients, recipe }: DishGeneralProps) {
    return (
        <div className={styles['result-details']}>
            <ul>
                <li>
                    <div className={styles['result-dish-title']}>
                        <h3>{dish.title}</h3>
                        {dish.language !== 'pl' &&
                            <img
                                src="/uk.png"
                                alt="Flaga UK"
                                width={48}
                                title="Danie zostało przetłumaczone. Może zawierać błędy w tłumaczeniu."
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
                        <span>{dish.readyInMinutes}</span>
                        <span>minut</span>
                    </div>
                    <div className={styles['information-container']}>
                        <span>Typ dania:</span>
                        <span><FlatwareIcon /></span>
                        <span>{DishTypeText[dish.mealType][dish.type].pl}</span>
                    </div>
                    <div className={styles['information-container']}>
                        <span>Autor:</span>
                        <span><PersonAddIcon /></span>
                        <span>{dish.sourceOrAuthor} {dish.provider === 'spoonacular' ? '(poprzez Spoonacular)' : ''}</span>
                    </div>
                </li>
                <li className={styles['result-rating']}>
                    <DishRating />
                    <div>
                        {dish.provider === 'yummy' && <EditLink label={'Edytuj'} link={`/dishes/create/${dish.id}`} />}
                        <DishDeletion dish={dish} />
                    </div>
                </li>
            </ul>
            <div className={styles['dish-details-sections']}>
                <DishDescription description={description} dish={dish} />
                <DishIngredients ingredients={ingredients} dish={dish} />
                <DishRecipe recipe={recipe} dish={dish} />
            </div>
        </div>
    );
}
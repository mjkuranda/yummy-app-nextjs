import styles from '@/styles/app/dishes/[id]/page.module.scss';
import { DishRecipe } from '@/src/app/dishes/[id]/dish-recipe';
import { DetailedDish, DishRecipeSection, TranslatedIngredient } from '@/src/types/api.types';
import { DishRating } from '@/src/app/dishes/[id]/dish-rating';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DishTypeText } from '@/src/types/dish.types';
import FlatwareIcon from '@mui/icons-material/Flatware';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { DishIngredients } from '@/src/app/dishes/[id]/dish-ingredients';
import { DishDescription } from '@/src/app/dishes/[id]/dish-description';
import { DishDeletion } from '@/src/app/dishes/[id]/dish-deletion';
import { DishEdition } from '@/src/app/dishes/[id]/dish-edition';
import { FlagIcon } from '@/src/components/common/flag-icon';
import { Suspense } from 'react';
import Link from 'next/link';

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
                        {dish.language !== 'pl' && <FlagIcon language={'en'} />}
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
                        <span>
                            {dish.provider !== 'spoonacular'
                                ? <Link href={`/users/${dish.sourceOrAuthor}/profile?dishId=${dish.id}`}>{dish.sourceOrAuthor}</Link>
                                : <>{dish.sourceOrAuthor} (poprzez Spoonacular)</>
                            }
                        </span>
                    </div>
                </li>
                <li className={styles['result-rating']}>
                    <DishRating />
                    <div>
                        <DishEdition dish={dish} />
                        <DishDeletion dish={dish} />
                    </div>
                </li>
            </ul>
            <div className={styles['dish-details-sections']}>
                <DishDescription description={description} dish={dish} />
                <Suspense><DishIngredients ingredients={ingredients} dish={dish} /></Suspense>
                <DishRecipe recipe={recipe?.length ? recipe : dish.recipeSections} dish={dish} />
            </div>
        </div>
    );
}
import styles from '@/styles/app/dishes/[id]/page.module.scss';
import { DishRecipe } from '@/src/app/dishes/[id]/dish-recipe';
import { DetailedDish } from '@/src/types/api.types';
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
import { Loader } from '@/src/components/common/loader';
import LanguageTabs from '@/src/components/language-tabs';

interface DishGeneralProps {
    dish: DetailedDish;
    sourceUrl: string | null;
}

export function DishGeneral({ dish, sourceUrl }: DishGeneralProps) {
    return (
        <div className={styles['result-details']}>
            <LanguageTabs dish={dish} />
            <ul>
                <li>
                    <div className={styles['result-dish-title']}>
                        <h3>{dish.title}</h3>
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
                                ? <Link href={`/users/${dish.sourceOrAuthor}/profile?dishId=${dish.id}` + (sourceUrl ? `&sourceUrl=${sourceUrl}` : '')}>{dish.sourceOrAuthor}</Link>
                                : <>{dish.sourceOrAuthor} (poprzez Spoonacular)</>
                            }
                        </span>
                    </div>
                    <div className={styles['information-container']}>
                        <span>Oryginalny język: <FlagIcon language={dish.language.original} size={32} /></span>

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
                <DishDescription description={dish.description} />
                <Suspense fallback={<Loader />}>
                    <DishIngredients {...dish.ingredients} />
                </Suspense>
                <DishRecipe dish={dish} />
            </div>
        </div>
    );
}
'use client';

import { DetailedMeal, TranslatedIngredient } from '@/src/types/api.types';
import { MealIngredientElement } from '@/src/app/result/[id]/meal-ingredient-element';
import styles from '@/styles/app/result/page.module.scss';
import { useSearchParams } from 'next/navigation';
import { useComparedIngredients } from '@/src/hooks/use-compared-ingredients';

interface MealIngredientsProps {
    meal: DetailedMeal;
    ingredients?: TranslatedIngredient[];
}

export function MealIngredients({ meal, ingredients }: MealIngredientsProps) {
    const searchParams = useSearchParams();
    const comparedIngredients = useComparedIngredients(searchParams, meal);

    return (
        <div className={styles['meal-ingredients']}>
            <h5>Składniki:</h5>
            <ul>
                {ingredients ?
                    ingredients.map((ingredient, idx) => <MealIngredientElement text={ingredient.text} imageUrl={ingredient.imageUrl} contains={comparedIngredients && comparedIngredients[idx]} />) :
                    meal.ingredients.map((ingredient, idx) => <MealIngredientElement text={`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`} imageUrl={ingredient.imageUrl} contains={comparedIngredients && comparedIngredients[idx]} />)
                }
            </ul>
        </div>
    );
}
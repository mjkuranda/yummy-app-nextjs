'use client';

import { DetailedDish, TranslatedIngredient } from '@/src/types/api.types';
import { DishIngredientElement } from '@/src/app/result/[id]/dish-ingredient-element';
import styles from '@/styles/app/result/page.module.scss';
import { useSearchParams } from 'next/navigation';
import { useComparedIngredients } from '@/src/hooks/use-compared-ingredients';

interface DishIngredientsProps {
    dish: DetailedDish;
    ingredients?: TranslatedIngredient[];
}

export function DishIngredients({ dish, ingredients }: DishIngredientsProps) {
    const searchParams = useSearchParams();
    const comparedIngredients = useComparedIngredients(searchParams, dish);

    return (
        <div className={styles['dish-ingredients']}>
            <h5>Składniki:</h5>
            <ul>
                {/* Index for ingredients is okay, because I do nothing with them except from rendering */}
                {ingredients && ingredients.length > 0 ?
                    ingredients.map((ingredient, idx) => <DishIngredientElement key={idx} text={ingredient.text} imageUrl={ingredient.imageUrl} contains={comparedIngredients && comparedIngredients[idx]} />) :
                    dish.ingredients.map((ingredient, idx) => <DishIngredientElement key={idx} text={`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`} imageUrl={ingredient.imageUrl} contains={comparedIngredients && comparedIngredients[idx]} />)
                }
            </ul>
        </div>
    );
}
'use client';

import { Ingredient, TranslatedIngredient } from '@/src/types/api.types';
import { DishIngredientElement } from '@/src/app/dishes/[id]/dish-ingredient-element';
import styles from '@/styles/app/dishes/[id]/page.module.scss';
import { useSearchParams } from 'next/navigation';
import { useComparedIngredients } from '@/src/hooks/use-compared-ingredients';

interface DishIngredientsProps {
    original: Ingredient[];
    translated: TranslatedIngredient[];
}

export function DishIngredients({ original, translated }: DishIngredientsProps) {
    const searchParams = useSearchParams();
    const comparedIngredients = useComparedIngredients(searchParams, original);

    return (
        <div className={styles['dish-ingredients']}>
            <h5>Składniki:</h5>
            <ul>
                {/* Index for ingredients is okay, because I do nothing with them except from rendering */}
                {translated?.length > 0 &&
                    translated.map((ingredient, idx) => <DishIngredientElement key={idx} text={ingredient.text} imageUrl={ingredient.imageUrl} contains={comparedIngredients && comparedIngredients[idx]} />)
                }
            </ul>
        </div>
    );
}
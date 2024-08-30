import styles from '@/styles/app/result/page.module.scss';
import { DetailedMealWithTranslations } from '@/src/types/api.types';
import { MealIngredientElement } from '@/src/app/result/[id]/meal-ingredient-element';

interface MealIngredientContainerProps {
    complexMealObject: DetailedMealWithTranslations;
}

export function MealIngredientContainer({ complexMealObject }: MealIngredientContainerProps) {
    const { meal, ingredients } = complexMealObject;

    return (
        <div className={styles['result-ingredients']}>
            <h3>Składniki</h3>
            <ul>
                {meal.ingredients.map(ingredient => <MealIngredientElement text={`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`} imageUrl={ingredient.imageUrl} />)}
                {/* FIXME: i18n will be the best option */}
                {/*{ingredients*/}
                {/*    ? ingredients.map(ingredient => <MealIngredientElement text={ingredient.text} imageUrl={ingredient.imageUrl} />)*/}
                {/*    : meal.ingredients.map(ingredient => <MealIngredientElement text={`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`} imageUrl={ingredient.imageUrl} />)*/}
                {/*}*/}
            </ul>
        </div>
    );
}
import { DetailedMeal, TranslatedIngredient } from '@/src/types/api.types';
import { MealIngredientElement } from '@/src/app/result/[id]/meal-ingredient-element';
import styles from '@/styles/app/result/page.module.scss';

interface MealIngredientsProps {
    meal: DetailedMeal;
    ingredients?: TranslatedIngredient[];
}

export function MealIngredients({ meal, ingredients }: MealIngredientsProps) {
    return (
        <div className={styles['meal-ingredients']}>
            <h5>Składniki:</h5>
            <ul>
                {ingredients ?
                    ingredients.map(ingredient => <MealIngredientElement text={ingredient.text} imageUrl={ingredient.imageUrl} />) :
                    meal.ingredients.map(ingredient => <MealIngredientElement text={`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`} imageUrl={ingredient.imageUrl} />)
                }
            </ul>
        </div>
    );
}
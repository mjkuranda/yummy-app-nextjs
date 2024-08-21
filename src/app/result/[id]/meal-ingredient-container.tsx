import styles from '@/styles/app/result/page.module.scss';
import { Ingredient } from '@/src/types/api.types';

interface MealIngredientContainerProps {
    ingredients: Ingredient[];
}

export function MealIngredientContainer({ ingredients }: MealIngredientContainerProps) {
    return (
        <div className={styles['result-ingredients']}>
            <h3>Składniki</h3>
            <ul>
                {ingredients.map(ingredient => {
                    return (
                        <li className={`d-flex justify-content-center align-items-center ${styles['result-ingredient']}`}
                            key={ingredient.name}>
                            <img className={styles['result-ingredient__image']} src={ingredient.imageUrl}
                                alt={ingredient.name} />
                            <span
                                className={styles['result-ingredient__text']}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
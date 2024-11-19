import { IngredientCategoryLabels, IngredientCategoryType } from '@/src/types/ingredient-category';
import styles from '@/styles/app/search/search-ingredient-category.module.scss';

interface SearchIngredientItemListProps {
    category: IngredientCategoryType;
    ingredients: IngredientCategoryLabels[];
    queryIngredients: string[];
}

export function SearchIngredientItemList({ category, ingredients, queryIngredients }: SearchIngredientItemListProps) {
    return ingredients.map(ingredient => {
        const ingredientId = `ingredient:${ingredient.en}:category:${category}`;
        const defaultChecked = queryIngredients.includes(ingredient.en);

        return (
            <li className={styles['search-ingredient-category__ingredient']} key={`${category}-${ingredient.en}`} data-filter="ingredient">
                <input type="checkbox" name={ingredientId} id={ingredientId} className="d-none"
                    defaultChecked={defaultChecked} />
                <label htmlFor={ingredientId}>
                    {ingredient.imageUrl
                        ? <img src={`https://img.spoonacular.com/ingredients_250x250/${ingredient.imageUrl}`}
                            alt="Ingredient image icon"
                            width={32}
                            height={32}
                            style={{ borderRadius: '50%', marginRight: '0.3rem' }}
                        />
                        : <img src="/ingredient.png"
                            alt="Generic ingredient image icon"
                            width={32}
                            data-a-href="https://www.flaticon.com/free-icons/ingredients"
                            data-a-title="ingredients icons"
                            data-a-text="Ingredients icons created by Flat Icons - Flaticon"
                        />
                    }
                    {ingredient.pl}
                </label>
            </li>
        );
    });
}
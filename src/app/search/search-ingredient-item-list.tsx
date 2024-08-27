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
                <input type="checkbox" name={ingredientId} id={ingredientId} className="d-none" defaultChecked={defaultChecked} />
                <label htmlFor={ingredientId}>{ingredient.pl}</label>
            </li>
        );
    });
}
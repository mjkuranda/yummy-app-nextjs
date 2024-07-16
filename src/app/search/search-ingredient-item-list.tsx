import { IngredientCategoryType } from '@/src/types/ingredient-category';
import styles from '@/styles/app/search/search-ingredient-category.module.scss';

interface SearchIngredientItemListProps {
    category: IngredientCategoryType;
    ingredients: string[];
    queryIngredients: string[];
}

export function SearchIngredientItemList({ category, ingredients, queryIngredients }: SearchIngredientItemListProps) {
    return ingredients.map(ingredient => {
        const ingredientId = `ingredient:${ingredient}:category:${category}`;
        const defaultChecked = queryIngredients.includes(ingredient);

        return (
            <li className={styles['search-ingredient-category__ingredient']} key={`${category}-${ingredient}`} data-filter="ingredient">
                <input type="checkbox" name={ingredientId} id={ingredientId} className="d-none" defaultChecked={defaultChecked} />
                <label htmlFor={ingredientId}>{ingredient}</label>
            </li>
        );
    });
}
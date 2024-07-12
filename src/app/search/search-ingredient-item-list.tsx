import { IngredientCategoryType } from '@/src/types/ingredient-category';
import styles from '@/styles/app/search/search-ingredient-category.module.scss';

interface SearchIngredientItemListProps {
    category: IngredientCategoryType;
    ingredients: string[];
}

export function SearchIngredientItemList({ category, ingredients }: SearchIngredientItemListProps) {
    return ingredients.map(ingredient => {
        const ingredientId = `ingredient:${ingredient}:category:${category}`;

        return (
            <li className={styles['search-ingredient-category__ingredient']} key={`${category}-${ingredient}`} data-filter="ingredient">
                <input type="checkbox" name={ingredientId} id={ingredientId} className="d-none" />
                <label htmlFor={ingredientId}>{ingredient}</label>
            </li>
        );
    });
}
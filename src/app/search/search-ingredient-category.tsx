import styles from '@/styles/app/search/search-ingredient-category.module.scss';
import { useIngredientCategory } from '@/src/hooks/use-ingredient-category';
import { IngredientCategoryType } from '@/src/types/ingredient-category';

interface SearchIngredientCategoryProps {
    category: IngredientCategoryType;
}

export default function SearchIngredientCategory({ category }: SearchIngredientCategoryProps) {
    const { data } = useIngredientCategory(category);

    return (
        <div className={styles['search-ingredient-category']}>
            <span className={styles['search-ingredient-category__title']}>{category}</span>
            <ul className={styles['search-ingredient-category__list']}>
                {data.map(ingredient => {
                    const ingredientId = `ingredient:${ingredient}:category:${category}`;

                    return (
                        <li className={styles['search-ingredient-category__ingredient']} key={`${category}-${ingredient}`}>
                            <input type="checkbox" name={ingredientId} id={ingredientId} className="d-none" />
                            <label htmlFor={ingredientId}>{ingredient}</label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

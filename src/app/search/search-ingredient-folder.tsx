import styles from '@/styles/app/search/search-ingredient-category.module.scss';
import { IngredientCategoryType } from '@/src/types/ingredient-category';

interface SearchIngredientFolderProps {
    category: IngredientCategoryType;
    folded: boolean;
    onChange: () => void;
}

export function SearchIngredientFolder({ category, folded, onChange }: SearchIngredientFolderProps) {
    const ingredientId = `${category}-folding`;

    return (
        <span className={styles['search-ingredient-category__ingredient']} key={ingredientId}>
            <input type="checkbox" name={ingredientId} id={ingredientId} className="d-none" onChange={onChange} />
            <label htmlFor={ingredientId}>
                <div className="d-flex justify-content-center align-items-center w-100 h-100">
                    {folded ? 'Rozwiń' : 'Zwiń'}
                </div>
            </label>
        </span>
    );
}
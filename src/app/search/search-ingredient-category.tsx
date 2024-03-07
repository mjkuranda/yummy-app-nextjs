import styles from '@/styles/app/search/search-ingredient-category.module.scss';
import { useIngredientCategory } from '@/src/hooks/use-ingredient-category';
import { IngredientCategoryType } from '@/src/types/ingredient-category';
import { SearchIngredientList } from '@/src/app/search/search-ingredient-list';

interface SearchIngredientCategoryProps {
    category: IngredientCategoryType;
}

export default function SearchIngredientCategory({ category }: SearchIngredientCategoryProps) {
    const { data } = useIngredientCategory(category);

    return (
        <div className={styles['search-ingredient-category']}>
            <span className={styles['search-ingredient-category__title']}>{category}</span>
            <SearchIngredientList category={category} data={data} />
        </div>
    );
}

import styles from '@/styles/app/search/search-ingredient-category.module.scss';
import { useIngredientCategory } from '@/src/hooks/use-ingredient-category';
import { IngredientCategoryType } from '@/src/types/ingredient-category';
import { SearchIngredientList } from '@/src/app/search/search-ingredient-list';
import { useMemo } from 'react';
import path from 'path';
import fs from 'fs';

interface SearchIngredientCategoryProps {
    category: IngredientCategoryType;
}

export default function SearchIngredientCategory({ category }: SearchIngredientCategoryProps) {
    const categories = useMemo(() => {
        const filePath = path.join(process.cwd(), 'public/data/categories.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');

        return JSON.parse(jsonData);
    }, []);
    const ingredientData = useIngredientCategory(category);

    return (
        <div className={styles['search-ingredient-category']}>
            <div className={styles['search-ingredient-category__title']}>{categories[category].pl}</div>
            <SearchIngredientList category={category} data={ingredientData} />
        </div>
    );
}

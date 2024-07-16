'use client';

import styles from '@/styles/app/search/search-ingredient-category.module.scss';
import { IngredientCategoryType } from '@/src/types/ingredient-category';
import { useState } from 'react';
import { SearchIngredientItemList } from '@/src/app/search/search-ingredient-item-list';
import { SearchIngredientFolder } from '@/src/app/search/search-ingredient-folder';
import { useSearchFilters } from '@/src/hooks/use-search-filters';

interface SearchIngredientListProps {
    category: IngredientCategoryType;
    data: string[];
}

export function SearchIngredientList({ category, data }: SearchIngredientListProps) {
    const [folded, setFolded] = useState<boolean>(true);
    const ingredients = folded ? data.filter((el, idx) => idx < 10) : [...data];
    const { ings: queryIngredients } = useSearchFilters();

    const onChange = () => setFolded(!folded);

    return (
        <ul className={styles['search-ingredient-category__list']}>
            <SearchIngredientItemList category={category} ingredients={ingredients} queryIngredients={queryIngredients} />
            <SearchIngredientFolder category={category} onChange={onChange} />
        </ul>
    );
}
import { IngredientCategoryData, IngredientCategoryType } from '@/src/types/ingredient-category';
import path from 'path';
import fs from 'fs';

export function useIngredientCategory(category: IngredientCategoryType): IngredientCategoryData {
    const filePath = path.join(process.cwd(), `public/data/ingredients/${category}.json`);
    const jsonData = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(jsonData);
}
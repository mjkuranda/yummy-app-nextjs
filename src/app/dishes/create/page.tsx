import { CreateDishForm } from '@/src/app/dishes/create/create-dish-form';
import { IngredientData, IngredientDataValue } from '@/src/types/ingredient.types';
import path from 'path';
import fs from 'fs';
import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';
import { BackLinkBar } from '@/src/components/common/back-link-bar';

export default function CreateDishPage() {
    const ingredients = getMergedIngredients();

    return (
        <WrappedContentLayout style={{ padding: '16px 10%' }}>
            <BackLinkBar link="/search" label={'Powrót do wyszukiwania'} />
            <CreateDishForm ingredients={ingredients} />
        </WrappedContentLayout>
    );
}

export function fetchIngredients(): IngredientDataValue[] {
    const filePath = path.join(process.cwd(), 'public/data/ingredients/ingredients.json');
    const ingredientsData = fs.readFileSync(filePath, 'utf-8');
    const json: IngredientData = JSON.parse(ingredientsData);
    const ingredients: IngredientDataValue[] = Object.entries(json).map(el => el[1]);

    return ingredients;
}

export function getMergedIngredients(): IngredientDataValue[] {
    const categories = ['breads', 'cereal-products', 'dairy-and-eggs', 'fish-and-seafood', 'fruits', 'meats', 'mushrooms', 'oils-and-fats', 'pasta', 'seeds-and-nuts', 'spices', 'vegetables'];
    const ingredientsArray = categories.map(category => {
        const filePath = path.join(process.cwd(), `public/data/ingredients/${category}.json`);
        const ingredientsData = fs.readFileSync(filePath, 'utf-8');
        const json: IngredientData = JSON.parse(ingredientsData);
        const ingredients: IngredientDataValue[] = Object.entries(json).map(el => el[1]);

        return ingredients;
    });

    return ingredientsArray.flat();
}
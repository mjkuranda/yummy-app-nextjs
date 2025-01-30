import styles from '@/styles/app/dishes/create/page.module.scss';
import { CreateDishForm } from '@/src/app/dishes/create/create-dish-form';
import { BackLink } from '@/src/components/common/back-link';
import { IngredientData, IngredientDataValue } from '@/src/types/ingredient.types';
import path from 'path';
import fs from 'fs';
import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';

export default function CreateDishPage() {
    const ingredients = getMergedIngredients();

    return (
        <WrappedContentLayout>
            <div className={styles['create-dish-page']}>
                <BackLink link="/search" label={'Powrót do wyszukiwania'} />
                <CreateDishForm ingredients={ingredients} />
            </div>
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
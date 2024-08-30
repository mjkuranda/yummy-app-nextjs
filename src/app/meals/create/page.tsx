import styles from '@/styles/app/meals/create/page.module.scss';
import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { CreateMealForm } from '@/src/app/meals/create/create-meal-form';
import { BackLink } from '@/src/components/common/back-link';
import { IngredientData, IngredientDataValue } from '@/src/types/ingredient.types';
import path from 'path';
import fs from 'fs';

export default function CreateMealPage() {
    const ingredients = fetchIngredients();

    return (
        <>
            <Header />
            <div className={styles['create-meal-page']}>
                <BackLink link="/search" label={'Back to search'} />
                <CreateMealForm ingredients={ingredients} />
            </div>
            <Footer />
        </>
    );
}

export function fetchIngredients(): IngredientDataValue[] {
    const filePath = path.join(process.cwd(), 'public/data/ingredients/ingredients.json');
    const ingredientsData = fs.readFileSync(filePath, 'utf-8');
    const json: IngredientData = JSON.parse(ingredientsData);
    const ingredients: IngredientDataValue[] = Object.entries(json).map(el => el[1]);

    return ingredients;
}
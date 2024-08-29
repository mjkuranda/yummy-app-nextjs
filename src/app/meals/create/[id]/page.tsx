import styles from '@/styles/app/meals/create/page.module.scss';
import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { CreateMealForm } from '@/src/app/meals/create/create-meal-form';
import { BackLink } from '@/src/components/common/back-link';
import { getMeal } from '@/src/api/api';
import fs from 'fs';
import { IngredientData, IngredientDataValue } from '@/src/types/ingredient.types';
import path from 'path';
import { redirect } from 'next/navigation';

interface EditMealPageProps {
    params: {
        id: string;
    }
}

export default async function EditMealPage({ params: { id } }: EditMealPageProps) {
    const mealWithTranslations = await getMeal(id);

    if (mealWithTranslations.meal.provider !== 'yummy') {
        return redirect(`/result/${id}`);
    }

    const filePath = path.join(process.cwd(), 'public/data/ingredients/ingredients.json');
    const ingredientsData = fs.readFileSync(filePath, 'utf-8');
    const json: IngredientData = JSON.parse(ingredientsData);
    const ingredients: IngredientDataValue[] = Object.entries(json).map(el => el[1]);

    return (
        <>
            <Header />
            <div className={styles['create-meal-page']}>
                <BackLink link={`/result/${id}`} label={'Back to meal'} />
                <CreateMealForm meal={mealWithTranslations} ingredients={ingredients} />
            </div>
            <Footer />
        </>
    );
}
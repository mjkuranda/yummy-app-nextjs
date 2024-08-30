import styles from '@/styles/app/meals/create/page.module.scss';
import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { CreateMealForm } from '@/src/app/meals/create/create-meal-form';
import { BackLink } from '@/src/components/common/back-link';
import { getMeal } from '@/src/api/api';
import { redirect } from 'next/navigation';
import { fetchIngredients } from '@/src/app/meals/create/page';

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

    const ingredients = fetchIngredients();

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
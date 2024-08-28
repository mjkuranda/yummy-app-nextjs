import styles from '@/styles/app/meals/create/page.module.scss';
import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { CreateMealForm } from '@/src/app/meals/create/create-meal-form';
import { BackLink } from '@/src/components/common/back-link';
import { getMeal } from '@/src/api/api';

interface EditMealPageProps {
    params: {
        id: string;
    }
}

export default async function EditMealPage({ params: { id } }: EditMealPageProps) {
    const mealWithTranslations = await getMeal(id);

    return (
        <>
            <Header />
            <div className={styles['create-meal-page']}>
                <BackLink link="/search" label={'Back to search'} />
                <CreateMealForm meal={mealWithTranslations} />
            </div>
            <Footer />
        </>
    );
}
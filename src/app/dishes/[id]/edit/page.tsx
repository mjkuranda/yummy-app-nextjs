import styles from '@/styles/app/dishes/create/page.module.scss';
import { Header } from '@/src/components/common/header';
import { Footer } from '@/src/components/common/footer';
import { CreateDishForm } from '@/src/app/dishes/create/create-dish-form';
import { BackLink } from '@/src/components/common/back-link';
import { getDish } from '@/src/api/api';
import { redirect } from 'next/navigation';
import { fetchIngredients } from '@/src/app/dishes/create/page';

interface EditDishPageProps {
    params: {
        id: string;
    }
}

export default async function EditDishPage({ params: { id } }: EditDishPageProps) {
    const dishWithTranslations = await getDish(id);

    if (dishWithTranslations.dish.provider !== 'yummy') {
        return redirect(`/dishes/${id}`);
    }

    const ingredients = fetchIngredients();

    return (
        <>
            <Header />
            <div className={styles['create-dish-page']}>
                <BackLink link={`/dishes/${id}`} label={'Powrót do dania'} />
                <CreateDishForm dish={dishWithTranslations} ingredients={ingredients} />
            </div>
            <Footer />
        </>
    );
}
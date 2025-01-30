import { CreateDishForm } from '@/src/app/dishes/create/create-dish-form';
import { BackLinkBar } from '@/src/components/common/back-link-bar';
import { getDish } from '@/src/api/api';
import { redirect } from 'next/navigation';
import { fetchIngredients } from '@/src/app/dishes/create/page';
import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';

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
        <WrappedContentLayout style={{ padding: '16px 10%' }}>
            <BackLinkBar link={`/dishes/${id}`} label={'Powrót do dania'} />
            <CreateDishForm dish={dishWithTranslations} ingredients={ingredients} />
        </WrappedContentLayout>
    );
}
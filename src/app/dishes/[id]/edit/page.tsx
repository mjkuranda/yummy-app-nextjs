import { BackLinkBar } from '@/src/components/common/back-link-bar';
import { fetchIngredients } from '@/src/app/dishes/create/page';
import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';
import { DishEditorContainer } from '@/src/app/dishes/[id]/edit/dish-editor-container';

interface EditDishPageProps {
    params: {
        id: string;
    }
}

export default async function EditDishPage({ params: { id } }: EditDishPageProps) {
    const ingredients = fetchIngredients();

    return (
        <WrappedContentLayout style={{ padding: '.5rem 10%' }}>
            <BackLinkBar link={`/dishes/${id}`} label={'Wróć do dania'} onlyMarginBottom={true} />
            <DishEditorContainer ingredients={ingredients} dishId={id} />
        </WrappedContentLayout>
    );
}
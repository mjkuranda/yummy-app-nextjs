import { DishImage } from '@/src/app/dishes/[id]/dish-image';
import { DetailedDishWithTranslations } from '@/src/types/api.types';
import { DishGeneral } from '@/src/app/dishes/[id]/dish-general';
import { DishCommentContainer } from '@/src/app/dishes/[id]/dish-comment-container';

interface DishContainerProps {
    complexDishObject: DetailedDishWithTranslations;
    sourceUrl: string | null;
}

export function DishContainer({ complexDishObject, sourceUrl }: DishContainerProps) {
    const { dish, description, ingredients, recipe } = complexDishObject;

    return (
        <>
            <DishImage imgUrl={dish.imgUrl} title={dish.title} provider={dish.provider} />
            <DishGeneral dish={dish} description={description} ingredients={ingredients} recipe={recipe} sourceUrl={sourceUrl} />
            <DishCommentContainer />
        </>
    );
}
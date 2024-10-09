import { DishImage } from '@/src/app/result/[id]/dish-image';
import { DetailedDishWithTranslations } from '@/src/types/api.types';
import { DishGeneral } from '@/src/app/result/[id]/dish-general';
import { DishCommentContainer } from '@/src/app/result/[id]/dish-comment-container';

interface DishContainerProps {
    complexDishObject: DetailedDishWithTranslations;
}

export function DishContainer({ complexDishObject }: DishContainerProps) {
    const { dish, description, ingredients, recipe } = complexDishObject;

    return (
        <>
            <DishImage imgUrl={dish.imgUrl} title={dish.title} provider={dish.provider} />
            <DishGeneral dish={dish} description={description} ingredients={ingredients} recipe={recipe} />
            <DishCommentContainer />
        </>
    );
}
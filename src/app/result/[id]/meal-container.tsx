import { MealImage } from '@/src/app/result/[id]/meal-image';
import { DetailedMealWithTranslations } from '@/src/types/api.types';
import { MealGeneral } from '@/src/app/result/[id]/meal-general';
import { MealCommentContainer } from '@/src/app/result/[id]/meal-comment-container';

interface MealContainerProps {
    complexMealObject: DetailedMealWithTranslations;
}

export function MealContainer({ complexMealObject }: MealContainerProps) {
    const { meal, description, ingredients, recipe } = complexMealObject;

    return (
        <>
            <MealImage imgUrl={meal.imgUrl} title={meal.title} provider={meal.provider} />
            <MealGeneral meal={meal} description={description} ingredients={ingredients} recipe={recipe} />
            <MealCommentContainer />
        </>
    );
}
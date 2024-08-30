import { MealImage } from '@/src/app/result/[id]/meal-image';
import { DetailedMealWithTranslations } from '@/src/types/api.types';
import { MealIngredientContainer } from '@/src/app/result/[id]/meal-ingredient-container';
import { MealGeneral } from '@/src/app/result/[id]/meal-general';
import { MealCommentContainer } from '@/src/app/result/[id]/meal-comment-container';

interface MealContainerProps {
    complexMealObject: DetailedMealWithTranslations;
}

export function MealContainer({ complexMealObject }: MealContainerProps) {
    const { meal, ingredients, recipe } = complexMealObject;

    return (
        <>
            <MealImage imgUrl={meal.imgUrl} title={meal.title} />
            <MealGeneral meal={meal} />
            <MealIngredientContainer complexMealObject={complexMealObject} />
            <MealCommentContainer />
        </>
    );
}
'use client';

import { IngredientDataValue } from '@/src/types/ingredient.types';
import { useGetDishById } from '@/src/api/endpoints';
import { Loader } from '@/src/components/common/loader';
import { DishCreatorContainer } from '@/src/app/dishes/create/dish-creator-container';
import { useRouter } from 'next/navigation';

interface DishEditorContainerProps {
    ingredients: IngredientDataValue[];
    dishId: string;
}

export function DishEditorContainer({ ingredients, dishId }: DishEditorContainerProps) {
    const router = useRouter();
    const { data: dish, isLoading, isError } = useGetDishById(dishId);

    if (isLoading) {
        return <Loader isAbsolute={true} />;
    }

    if (isError) {
        router.push('/');

        return;
    }

    return <DishCreatorContainer ingredients={ingredients} dish={dish} />;
}
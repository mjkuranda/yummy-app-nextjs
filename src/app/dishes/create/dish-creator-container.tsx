'use client';

import { DishFormData, OnlyMealType } from '@/src/types/dish.types';
import { DetailedDishWithTranslations } from '@/src/types/api.types';
import { IngredientDataValue } from '@/src/types/ingredient.types';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/src/contexts/user.context';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getDefaultValues, getDishDifferences } from '@/src/helpers/dish.helper';
import { useEffect, useState } from 'react';
import { toastInfo, toastSuccess } from '@/src/utils/toast.utils';
import { createDish, editDish, uploadImage } from '@/src/api/api';
import { proceedFormToData } from '@/src/helpers/recipe-form.helper';
import { ApiError, handleApiError } from '@/src/api/api-errors';
import { CreateDishForm } from '@/src/app/dishes/create/create-dish-form';

export interface MealOption {
    en: OnlyMealType;
    label: string;
}

const mealOptions: MealOption[] = [
    { en: 'breakfast', label: 'Śniadanie' },
    { en: 'launch', label: 'Obiad' },
    { en: 'dinner', label: 'Kolacja' }
];

export type DishOption = Record<OnlyMealType, Array<{ en: string, label: string}>>;

const dishOptions: DishOption = {
    breakfast: [
        { en: 'any', label: 'Każdy' },
        { en: 'beverage', label: 'Napój' }
    ],
    launch: [
        { en: 'soup', label: 'Zupa' },
        { en: 'main course', label: 'Danie główne' },
        { en: 'salad', label: 'Sałatka' },
        { en: 'dessert', label: 'Deser' },
        { en: 'beverage', label: 'Napój' }
    ],
    dinner: [
        { en: 'any', label: 'Każdy' },
        { en: 'beverage', label: 'Napój' }
    ]
};

const defaultValues: DishFormData = {
    title: 'Nowe danie',
    description: 'To jest opis dla nowego dania...',
    readyInMinutes: '15',
    type: 'main course',
    mealType: 'launch',
    ingredients: [
        {
            id: crypto.randomUUID(),
            amount: '1',
            unit: 'piece',
            data: {
                id: 11124,
                en: 'carrot',
                pl: 'marchewka'
            }
        }
    ],
    recipe: [
        {
            id: crypto.randomUUID(),
            name: '',
            steps: [
                { id: crypto.randomUUID(), text: 'Tutaj wpisz pierwszy krok' },
                { id: crypto.randomUUID(), text: 'Tutaj wpisz drugi krok' },
                { id: crypto.randomUUID(), text: 'A tutaj kolejny... itd...' }
            ]
        }
    ],
    hasImage: false
};

interface DishCreatorContainerProps {
    dish?: DetailedDishWithTranslations;
    ingredients: IngredientDataValue[];
}


export function DishCreatorContainer({ dish, ingredients }: DishCreatorContainerProps) {
    const router = useRouter();
    const userContext = useUserContext();
    const { handleSubmit, control, formState: { errors }, reset, watch } = useForm<DishFormData>({ defaultValues: dish ? getDefaultValues(dish, ingredients) : defaultValues, mode: 'onChange' });
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [wasCreated, setWasCreated] = useState<boolean>(false);

    const titleWatch = watch('title');
    const mealTypeWatch = watch('mealType');

    const hasImageWatch = watch('hasImage');
    const hasImageUrlWatch = watch('hasImageUrl');

    const imageUrl = watch('imageUrl');
    const imageFile = watch('imageFile');

    useEffect(() => {
        if (userContext.isFetching) {
            return;
        }

        if (dish) {
            if (userContext.user.login === dish.dish.sourceOrAuthor) {
                return;
            }

            if (!userContext.user.isAdmin && !userContext.user.capabilities?.canEdit) {
                toastInfo('Aby edytować posiłki, potrzebujesz uprawnień admina, badź możliwości edycji.');

                return router.push(`/dishes/${dish?.dish.id}`);
            }
        } else {
            if (!userContext.user.isAdmin && !userContext.user.capabilities?.canAdd) {
                toastInfo('Aby dodawać nowe posiłki, potrzebujesz uprawnień admina, badź możliwości dodawania.');

                return router.push('/search');
            }
        }
    }, [userContext.isFetching]);

    const onSubmit: SubmitHandler<DishFormData> = async (data, e): Promise<void> => {
        e?.preventDefault();
        setIsCreating(true);

        try {
            let url;

            if (data.imageFile) {
                url = await uploadImage(data.imageFile);
            }

            const { user } = userContext;
            const dto = proceedFormToData(data, user.login, 'pl', url);

            await createDish(dto);
            toastSuccess('Pomyślnie utworzono nowe danie');
            setWasCreated(true);
            reset();
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                handleApiError(err, router, userContext);
            }
        } finally {
            setIsCreating(false);
        }
    };

    const onEdit: SubmitHandler<DishFormData> = async (data: DishFormData): Promise<void> => {
        const { user } = userContext;
        const proceededData = proceedFormToData(data, user.login, 'pl', data.imageUrl);
        const differences = getDishDifferences(dish!.dish, proceededData);

        setIsCreating(true);

        try {
            await editDish(dish!.dish.id, differences);

            toastSuccess('Pomyślnie edytowano danie');
            router.push(`/dishes/${dish!.dish.id}`);
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                handleApiError(err, router, userContext);
            }
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <CreateDishForm
            control={control}
            errors={errors}
            hasImageWatch={hasImageWatch}
            hasImageUrlWatch={hasImageUrlWatch}
            imageUrl={imageUrl}
            imageFile={imageFile}
            isCreating={isCreating}
            wasCreated={wasCreated}
            dishOptions={dishOptions}
            mealOptions={mealOptions}
            mealTypeWatch={mealTypeWatch}
            dish={dish}
            ingredients={ingredients}
            titleWatch={titleWatch}
            onEdit={onEdit}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
        />
    );
}
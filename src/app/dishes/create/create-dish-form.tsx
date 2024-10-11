'use client';

import { DishFormData, DishRecipeSectionWithId, MealType } from '@/src/types/dish.types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styles from '@/styles/app/dishes/create/create-dish-form.module.scss';
import { Loader } from '@/src/components/common/loader';
import { InputString } from '@/src/components/common/form/input-string';
import { Button } from '@/src/components/common/button';
import { InputImage } from '@/src/components/common/form/input-image';
import { InputSelect } from '@/src/components/common/form/input-select';
import { RecipeForm } from '@/src/app/dishes/create/recipe-form';
import { RecipeFormProvider } from '@/src/contexts/recipe-form.context';
import { InputCheckbox } from '@/src/components/common/form/input-checkbox';
import { InputAreaString } from '@/src/components/common/form/input-area-string';
import { proceedFormToData } from '@/src/helpers/recipe-form.helper';
import { useUserContext } from '@/src/contexts/user.context';
import { toastInfo, toastSuccess } from '@/src/utils/toast.utils';
import { createDish, editDish, uploadImage } from '@/src/api/api';
import { useRouter } from 'next/navigation';
import { DetailedDishWithTranslations } from '@/src/types/api.types';
import { getDefaultValues, getDishDifferences } from '@/src/helpers/dish.helper';
import { IngredientDataValue, IngredientWithId } from '@/src/types/ingredient.types';
import { IngredientFormProvider } from '@/src/contexts/ingredient-form.context';
import { IngredientForm } from '@/src/app/dishes/create/ingredient-form';
import { ApiError, handleApiError } from '@/src/api/api-errors';
import { InputNumber } from '@/src/components/common/form/input-number';

const mealOptions = [
    { en: 'breakfast', label: 'Śniadanie' },
    { en: 'launch', label: 'Obiad' },
    { en: 'dinner', label: 'Kolacja' }
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const dishOptions: Record<MealType, { en: string, label: string }[]> = {
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

interface CreateDishFormProps {
    dish?: DetailedDishWithTranslations;
    ingredients: IngredientDataValue[];
}
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

export function CreateDishForm({ dish, ingredients }: CreateDishFormProps) {
    const router = useRouter();
    const userContext = useUserContext();
    const { handleSubmit, control, formState: { errors }, reset, watch } = useForm<DishFormData>({ defaultValues: dish ? getDefaultValues(dish, ingredients) : defaultValues, mode: 'onChange' });
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [wasCreated, setWasCreated] = useState<boolean>(false);

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

                return router.push(`/result/${dish?.dish.id}`);
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

    const onEdit: SubmitHandler<DishFormData> = async (data): Promise<void> => {
        const { user } = userContext;
        const proceededData = proceedFormToData(data, user.login, 'pl', data.imageUrl);
        const differences = getDishDifferences(dish!.dish, proceededData);

        setIsCreating(true);

        try {
            await editDish(dish!.dish.id, differences);

            toastSuccess('Pomyślnie edytowano danie');
            router.push(`/result/${dish!.dish.id}`);
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                handleApiError(err, router, userContext);
            }
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <form className={styles['create-dish-form']}>
            {isCreating && <Loader isAbsolute={true} />}
            <div className={styles['form-content-container']}>
                <div className={styles['form-top-container']}>
                    <h2 className={styles['form-top-header']}>{dish ? 'Edytuj danie' : 'Stwórz nowe danie'}</h2>
                    <Controller
                        name={'title'}
                        control={control}
                        rules={{
                            required: 'Tytuł jest wymagany',
                            minLength: 4,
                            maxLength: 64
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputString label={'Wprowadź tytuł'} value={value} setValue={onChange} error={errors.title} />
                        )}
                    />
                </div>
                <div className={styles['form-field-container']}>
                    <div className={styles['form-left-side']}>
                        <Controller
                            name={'description'}
                            control={control}
                            rules={{
                                required: 'Opis jest wymagany',
                                minLength: {
                                    value: 3,
                                    message: 'Opis nie może być krótszy niż 3 znaki'
                                },
                                maxLength: {
                                    value: 1024,
                                    message: 'Opis nie może być dłuższy niż 1024 znaki'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <div>
                                    <InputAreaString
                                        label={'Wprowadź opis'}
                                        value={value}
                                        setValue={onChange}
                                        error={errors.description}
                                        maxRows={16}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            name={'readyInMinutes'}
                            control={control}
                            rules={{
                                required: 'Czas przygotowania jest wymagany',
                                min: {
                                    value: 1,
                                    message: 'Czas przygotowania musi wynosić przynajmniej 1 minutę'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <div>
                                    <InputNumber label={'Czas przygotowania w minutach'} setValue={onChange} value={value ?? '0'} error={errors.readyInMinutes} width={'100%'} />
                                </div>
                            )}
                        />
                        <Controller
                            name={'mealType'}
                            control={control}
                            rules={{ required: 'Typ posiłku jest wymagany' }}
                            render={({ field: { onChange, value } }) => (
                                <InputSelect id={'meal-type'} options={mealOptions} label={'Typ posiłku'} selectedValue={value} setSelectedValue={onChange} />
                            )}
                        />
                        <Controller
                            name={'type'}
                            control={control}
                            rules={{ required: 'Typ posiłku jest wymagany' }}
                            render={({ field: { onChange, value } }) => (
                                <InputSelect id={'dish-type'} options={dishOptions[mealTypeWatch]} label={'Wybierz typ dania'} selectedValue={value} setSelectedValue={onChange} />
                            )}
                        />
                        <Controller
                            name={'ingredients'}
                            control={control}
                            rules={{
                                required: 'Składniki są wymagane',
                                validate: {
                                    ingredientsRequired: (value: IngredientWithId[]) => value.length > 0 ? true : 'Składniki są wymagane',
                                    eachIngredientHasUnit: (value: IngredientWithId[]) => value.every(el => el.unit.length > 0) ? true : 'Każdy składnik musi mieć określoną jednostkę',
                                    eachAmountIsNumber: (value: IngredientWithId[]) => value.every(el => el.amount.length > 0 && !isNaN(Number(el.amount)) && Number(el.amount) > 0) ? true : 'Każda ilość musi być większa od zera'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <IngredientFormProvider ingredients={value} onChangeIngredients={onChange} error={errors.ingredients}>
                                    <IngredientForm ingredientDataValues={ingredients} />
                                </IngredientFormProvider>
                            )}
                        />
                        <Controller
                            name={'hasImage'}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <InputCheckbox id={'has-image'} label={'Ustaw zdjęcie'} isChecked={value} onChange={onChange} />
                            )}
                        />
                        {hasImageWatch && (
                            <>
                                <Controller
                                    name={'hasImageUrl'}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <InputCheckbox id={'has-image-url'} label={'Określ link do zdjęcia'} isChecked={value ?? false} onChange={onChange} />
                                    )}
                                />
                                {hasImageUrlWatch ?
                                    <Controller
                                        name={'imageUrl'}
                                        control={control}
                                        rules={{
                                            required: 'Link do zdjęcia jest wymagany',
                                            pattern: {
                                                value: /^((http|https):\/\/)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
                                                message: 'Link powinien być poprawnym adresem URL'
                                            }
                                        }}
                                        render={({ field: { onChange } }) => (
                                            <div>
                                                <InputString
                                                    label={'Wprowadź adres URL'}
                                                    value={imageUrl ?? ''}
                                                    setValue={onChange}
                                                    error={errors.imageUrl}
                                                    width="100%"
                                                />
                                                {imageUrl && <img src={imageUrl} alt={'Zdjęcie dania'} width={432} style={{ margin: '16px 0 0 66px' }} />}
                                            </div>
                                        )}
                                    /> :
                                    <Controller
                                        name={'imageFile'}
                                        control={control}
                                        rules={{ required: 'Zdjęcie jest wymagane' }}
                                        render={({ field: { onChange } }) => (
                                            <InputImage id={'dish-image'} image={imageFile} setImage={onChange} width="100%" error={errors.imageFile} />
                                        )}
                                    />
                                }
                            </>
                        )}
                    </div>
                    <div className={styles['form-right-side']}>
                        <Controller
                            name={'recipe'}
                            control={control}
                            rules={{
                                required: 'Przepis jest wymagany',
                                validate: {
                                    // required: (value: DishRecipeSectionWithId[]) => value.length > 0 ? true : 'Przepis jest wymagany',
                                    stepRequired: (value: DishRecipeSectionWithId[]) => value.length > 0 && value[0].steps.length > 1 ? true : 'Co najmniej 2 kroki są wymagane',
                                    minStepCount: (value: DishRecipeSectionWithId[]) => value.length > 0 && value.every(section => section.steps.length > 1) ? true : 'Każdy przepis powinien mieć co najmniej 2 kroki'
                                },
                                minLength: {
                                    value: 1,
                                    message: 'Przepis jest wymagany'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <RecipeFormProvider sections={value} onChangeSections={onChange} error={errors.recipe}>
                                    <RecipeForm />
                                </RecipeFormProvider>
                            )}
                        />
                    </div>
                </div>
                <div className={styles['create-button-container']}>
                    <div>
                        {dish
                            ? <Button label={'Edytuj'} onClick={handleSubmit(onEdit)} disabled={Object.keys(errors).length > 0} />
                            : <Button label={'Stwórz'} onClick={handleSubmit(onSubmit)} disabled={Object.keys(errors).length > 0} />
                        }
                    </div>
                    <div>
                        {wasCreated && 'Nowe danie zostało dodane. Poczekaj, aż administrator go zatwierdzi.'}
                    </div>
                </div>
            </div>
        </form>
    );
}
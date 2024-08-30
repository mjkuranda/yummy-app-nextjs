'use client';

import { MealFormData, MealRecipeSectionWithId } from '@/src/types/meal.types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styles from '@/styles/app/meals/create/create-meal-form.module.scss';
import { Loader } from '@/src/components/common/loader';
import { InputString } from '@/src/components/common/form/input-string';
import { Button } from '@/src/components/common/button';
import { InputImage } from '@/src/components/common/form/input-image';
import { InputSelect } from '@/src/components/common/form/input-select';
import { RecipeForm } from '@/src/app/meals/create/recipe-form';
import { RecipeFormProvider } from '@/src/contexts/recipe-form.context';
import { InputCheckbox } from '@/src/components/common/form/input-checkbox';
import { InputAreaString } from '@/src/components/common/form/input-area-string';
import { proceedFormToData } from '@/src/helpers/recipe-form.helper';
import { useUserContext } from '@/src/contexts/user.context';
import { toastInfo, toastSuccess } from '@/src/utils/toast.utils';
import { createMeal, editMeal, uploadImage } from '@/src/api/api';
import { useRouter } from 'next/navigation';
import { DetailedMealWithTranslations } from '@/src/types/api.types';
import { getDefaultValues, getMealDifferences } from '@/src/helpers/meal.helper';
import { IngredientDataValue, IngredientWithId } from '@/src/types/ingredient.types';
import { IngredientFormProvider } from '@/src/contexts/ingredient-form.context';
import { IngredientForm } from '@/src/app/meals/create/ingredient-form';
import { ApiError, handleApiError } from '@/src/api/api-errors';

const options = [
    { en: 'soup', label: 'Soup' },
    { en: 'main course', label: 'Main Course' },
    { en: 'salad', label: 'Salad' }
];

interface CreateMealFormProps {
    meal?: DetailedMealWithTranslations;
    ingredients: IngredientDataValue[];
}
const defaultValues: MealFormData = {
    title: '',
    description: '',
    ingredients: [],
    type: 'main course',
    recipe: [],
    hasImage: false,
};

export function CreateMealForm({ meal, ingredients }: CreateMealFormProps) {
    const router = useRouter();
    const userContext = useUserContext();
    const { handleSubmit, control, formState: { errors }, reset, watch } = useForm<MealFormData>({ defaultValues: meal ? getDefaultValues(meal, ingredients) : defaultValues, mode: 'onChange' });
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [wasCreated, setWasCreated] = useState<boolean>(false);

    const hasImageWatch = watch('hasImage');
    const hasImageUrlWatch = watch('hasImageUrl');

    const imageUrl = watch('imageUrl');
    const imageFile = watch('imageFile');

    useEffect(() => {
        if (userContext.isFetching) {
            return;
        }

        if (meal) {
            if (!userContext.user.isAdmin && !userContext.user.capabilities?.canEdit) {
                toastInfo('Aby edytować posiłki, potrzebujesz uprawnień admina, badź możliwości edycji.');

                return router.push(`/result/${meal?.meal.id}`);
            }
        } else {
            if (!userContext.user.isAdmin && !userContext.user.capabilities?.canAdd) {
                toastInfo('Aby dodawać nowe posiłki, potrzebujesz uprawnień admina, badź możliwości dodawania.');

                return router.push('/search');
            }
        }
    }, [userContext.isFetching]);

    const onSubmit: SubmitHandler<MealFormData> = async (data, e): Promise<void> => {
        e?.preventDefault();
        setIsCreating(true);

        try {
            let url;

            if (data.imageFile) {
                url = await uploadImage(data.imageFile);
            }

            const { user } = userContext;
            const dto = proceedFormToData(data, user.login, 'pl', url);

            await createMeal(dto);
            toastSuccess('Successfully created a new meal');
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

    const onEdit: SubmitHandler<MealFormData> = async (data, e): Promise<void> => {
        const { user } = userContext;
        const proceededData = proceedFormToData(data, user.login, 'pl', data.imageUrl);
        const differences = getMealDifferences(meal!.meal, proceededData);

        setIsCreating(true);

        try {
            await editMeal(meal!.meal.id, differences);

            toastSuccess('Successfully edited this meal.');
            router.push(`/result/${meal!.meal.id}`);
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                handleApiError(err, router, userContext);
            }
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <form className={styles['create-meal-form']}>
            {isCreating && <Loader isAbsolute={true} />}
            <div className={styles['form-content-container']}>
                <div className={styles['form-top-container']}>
                    <h2 className={styles['form-top-header']}>{meal ? 'Edit a meal' : 'Create a new meal'}</h2>
                    <Controller
                        name={'title'}
                        control={control}
                        rules={{
                            required: 'Title is required',
                            minLength: 4,
                            maxLength: 64
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputString label={'Type title'} value={value} setValue={onChange} error={errors.title} />
                        )}
                    />
                </div>
                <div className={styles['form-field-container']}>
                    <div className={styles['form-left-side']}>
                        <Controller
                            name={'description'}
                            control={control}
                            rules={{
                                required: 'Description is required',
                                minLength: 8,
                                maxLength: 1280
                            }}
                            render={({ field: { onChange, value } }) => (
                                <div>
                                    <InputAreaString
                                        label={'Type description'}
                                        value={value}
                                        setValue={onChange}
                                        error={errors.description}
                                        maxRows={16}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            name={'type'}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <InputSelect id={'meal-type'} options={options} label={'Select a type'} selectedValue={value} setSelectedValue={onChange} />
                            )}
                        />
                        <Controller
                            name={'ingredients'}
                            control={control}
                            rules={{
                                required: 'Ingredients are required',
                                validate: {
                                    ingredientsRequired: (value: IngredientWithId[]) => value.length > 0 ? true : 'Ingredients are required',
                                    eachIngredientHasUnit: (value: IngredientWithId[]) => value.every(el => el.unit.length > 0) ? true : 'Every ingredient must have defined unit',
                                    eachAmountIsNumber: (value: IngredientWithId[]) => value.every(el => el.amount.length > 0 && !isNaN(Number(el.amount)) && Number(el.amount) > 0) ? true : 'Every amount should be number value greater than 0'
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
                                <InputCheckbox id={'has-image'} label={'Has an image'} isChecked={value} onChange={onChange} />
                            )}
                        />
                        {hasImageWatch && (
                            <>
                                <Controller
                                    name={'hasImageUrl'}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <InputCheckbox id={'has-image-url'} label={'Has an image URL'} isChecked={value ?? false} onChange={onChange} />
                                    )}
                                />
                                {hasImageUrlWatch ?
                                    <Controller
                                        name={'imageUrl'}
                                        control={control}
                                        rules={{
                                            required: 'URL image is required',
                                            pattern: {
                                                value: /^((http|https):\/\/)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
                                                message: 'String should be a correct URL'
                                            }
                                        }}
                                        render={({ field: { onChange } }) => (
                                            <div>
                                                <InputString
                                                    label={'Type image URL'}
                                                    value={imageUrl ?? ''}
                                                    setValue={onChange}
                                                    error={errors.imageUrl}
                                                    width="100%"
                                                />
                                            </div>
                                        )}
                                    /> :
                                    <Controller
                                        name={'imageFile'}
                                        control={control}
                                        rules={{ required: 'Image is missing' }}
                                        render={({ field: { onChange } }) => (
                                            <InputImage id={'meal-image'} image={imageFile} setImage={onChange} width="100%" error={errors.imageFile} />
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
                                required: 'Recipe is required',
                                validate: {
                                    required: (value: MealRecipeSectionWithId[]) => value.length > 0 ? true : 'Recipe is required',
                                    stepRequired: (value: MealRecipeSectionWithId[]) => value.length > 0 && value[0].steps.length > 1 ? true : 'At least 2 steps are required',
                                    minStepCount: (value: MealRecipeSectionWithId[]) => value.length > 0 && value.every(section => section.steps.length > 1) ? true : 'Every section should have at least 2 steps'
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
                        {meal
                            ? <Button label={'Edit'} onClick={handleSubmit(onEdit)} disabled={Object.keys(errors).length > 0} />
                            : <Button label={'Create'} onClick={handleSubmit(onSubmit)} disabled={Object.keys(errors).length > 0} />
                        }
                    </div>
                    <div>
                        {wasCreated && 'New meal has been created. Wait, until an administrator will confirm its.'}
                    </div>
                </div>
            </div>
        </form>
    );
}
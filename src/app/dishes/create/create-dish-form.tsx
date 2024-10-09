'use client';

import { DishFormData, DishRecipeSectionWithId } from '@/src/types/dish.types';
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
    { en: 'breakfast', label: 'Breakfast' },
    { en: 'launch', label: 'Launch' },
    { en: 'dinner', label: 'Dinner' }
];

const dishOptions = [
    { en: 'soup', label: 'Soup' },
    { en: 'main course', label: 'Main Course' },
    { en: 'salad', label: 'Salad' }
];

interface CreateDishFormProps {
    dish?: DetailedDishWithTranslations;
    ingredients: IngredientDataValue[];
}
const defaultValues: DishFormData = {
    title: '',
    description: '',
    readyInMinutes: '0',
    type: 'main course',
    mealType: 'launch',
    ingredients: [],
    recipe: [],
    hasImage: false
};

export function CreateDishForm({ dish, ingredients }: CreateDishFormProps) {
    const router = useRouter();
    const userContext = useUserContext();
    const { handleSubmit, control, formState: { errors }, reset, watch } = useForm<DishFormData>({ defaultValues: dish ? getDefaultValues(dish, ingredients) : defaultValues, mode: 'onChange' });
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
            toastSuccess('Successfully created a new dish');
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

            toastSuccess('Successfully edited this dish.');
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
                    <h2 className={styles['form-top-header']}>{dish ? 'Edit a dish' : 'Create a new dish'}</h2>
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
                            name={'readyInMinutes'}
                            control={control}
                            rules={{
                                required: 'Time preparation must be defined',
                                validate: {
                                    readyInMinutesRequired: (value: string) => value?.length > 0 ? true : 'Time preparation must be defined',
                                    mustBeNumber: (value: string) => !isNaN(Number(value)) ? true : 'Time preparation must be a number'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <div>
                                    <InputNumber label={'Time preparation'} setValue={onChange} value={value ?? '0'} error={errors.readyInMinutes} width={'100%'} />
                                </div>
                            )}
                        />
                        <Controller
                            name={'type'}
                            control={control}
                            rules={{ required: 'Type is required' }}
                            render={({ field: { onChange, value } }) => (
                                <InputSelect id={'meal-type'} options={mealOptions} label={'Select a meal type'} selectedValue={value} setSelectedValue={onChange} />
                            )}
                        />
                        <Controller
                            name={'type'}
                            control={control}
                            rules={{ required: 'Dish type is required' }}
                            render={({ field: { onChange, value } }) => (
                                <InputSelect id={'dish-type'} options={dishOptions} label={'Select a dish type'} selectedValue={value} setSelectedValue={onChange} />
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
                                required: 'Recipe is required',
                                validate: {
                                    required: (value: DishRecipeSectionWithId[]) => value.length > 0 ? true : 'Recipe is required',
                                    stepRequired: (value: DishRecipeSectionWithId[]) => value.length > 0 && value[0].steps.length > 1 ? true : 'At least 2 steps are required',
                                    minStepCount: (value: DishRecipeSectionWithId[]) => value.length > 0 && value.every(section => section.steps.length > 1) ? true : 'Every section should have at least 2 steps'
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
                            ? <Button label={'Edit'} onClick={handleSubmit(onEdit)} disabled={Object.keys(errors).length > 0} />
                            : <Button label={'Create'} onClick={handleSubmit(onSubmit)} disabled={Object.keys(errors).length > 0} />
                        }
                    </div>
                    <div>
                        {wasCreated && 'New dish has been created. Wait, until an administrator will confirm its.'}
                    </div>
                </div>
            </div>
        </form>
    );
}
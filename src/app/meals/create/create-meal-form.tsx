'use client';

import { MealFormData, MealRecipeSectionWithId } from '@/src/types/meal.types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from '@/styles/app/meals/create/create-meal-form.module.scss';
import { Loader } from '@/src/components/common/loader';
import { InputString } from '@/src/components/common/form/input-string';
import { Button } from '@/src/components/common/button';
import { InputList } from '@/src/components/common/form/input-list';
import { InputImage } from '@/src/components/common/form/input-image';
import { InputSelect } from '@/src/components/common/form/input-select';
import { RecipeForm } from '@/src/app/meals/create/recipe-form';
import { RecipeFormProvider } from '@/src/contexts/recipe-form.context';
import { InputCheckbox } from '@/src/components/common/form/input-checkbox';
import { InputAreaString } from '@/src/components/common/form/input-area-string';
import { proceedFormToData } from '@/src/helpers/recipe-form.helper';
import { useUserContext } from '@/src/contexts/user.context';
import { toastError, toastSuccess } from '@/src/utils/toast.utils';
import { createMeal, uploadImage } from '@/src/api/api';

const items = [
    { label: 'Apple', en: 'apple' },
    { label: 'Banana', en: 'banana' },
    { label: 'Orange', en: 'orange' },
    { label: 'Pineapple', en: 'pineapple' },
    { label: 'Strawberry', en: 'strawberry' }
];

const options = [
    { en: 'soup', label: 'Soup' },
    { en: 'main course', label: 'Main Course' },
    { en: 'salad', label: 'Salad' },
    { en: 'raw salad', label: 'Raw Salad' }
];

const defaultValues: MealFormData = {
    title: '',
    description: '',
    ingredients: {},
    type: 'main course',
    recipe: [],
    hasImage: false,
};

export function CreateMealForm() {
    const { user, isLoggedIn } = useUserContext();
    const { handleSubmit, control, formState: { errors }, reset, watch } = useForm<MealFormData>({ defaultValues, mode: 'onChange' });
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [wasCreated, setWasCreated] = useState<boolean>(false);

    const hasImageWatch = watch('hasImage');
    const hasImageUrlWatch = watch('hasImageUrl');

    const imageUrl = watch('imageUrl');
    const imageFile = watch('imageFile');

    const onSubmit: SubmitHandler<MealFormData> = async (data, e): Promise<void> => {
        e?.preventDefault();
        setIsCreating(true);

        try {
            let url;

            if (data.imageFile) {
                url = await uploadImage(data.imageFile);
            }

            const dto = proceedFormToData(data, user.login, 'pl', url);

            await createMeal(dto);
            toastSuccess('Successfully created a new meal');
            setWasCreated(true);
            reset();
        } catch (err: any) {
            toastError(err.message);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <form className={styles['create-meal-form']}>
            {isCreating && <Loader isAbsolute={true} />}
            <div className={styles['form-content-container']}>
                <div className={styles['form-top-container']}>
                    <h2 className={styles['form-top-header']}>Create a new meal</h2>
                    <Controller
                        name={'title'}
                        control={control}
                        rules={{
                            required: 'Title is required',
                            minLength: 4,
                            maxLength: 32
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
                                maxLength: 1024
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
                                validate: (value: Record<string, string>) => Object.keys(value).length > 0 ? true : 'Ingredients are required'
                            }}
                            render={({ field: { onChange, value } }) => (
                                <InputList items={items} label={'Select ingredients'} selectedItems={value} setSelectedItems={onChange} error={errors.ingredients} />
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
                        <Button label={'Create'} onClick={handleSubmit(onSubmit)} disabled={Object.keys(errors).length > 0} />
                    </div>
                    <div>
                        {wasCreated && 'New meal has been created. Wait, until an administrator will confirm its.'}
                    </div>
                </div>
            </div>
        </form>
    );
}
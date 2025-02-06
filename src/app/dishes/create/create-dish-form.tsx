'use client';

import { DishFormData, DishRecipeSectionWithId, OnlyMealType } from '@/src/types/dish.types';
import { Control, Controller, FieldErrors, FieldValues, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
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
import { IngredientDataValue, IngredientWithId } from '@/src/types/ingredient.types';
import { IngredientFormProvider } from '@/src/contexts/ingredient-form.context';
import { IngredientForm } from '@/src/app/dishes/create/ingredient-form';
import { InputNumber } from '@/src/components/common/form/input-number';
import { DishImage } from '@/src/app/dishes/[id]/dish-image';
import { DishOption, MealOption } from '@/src/app/dishes/create/dish-creator-container';
import { DetailedDishWithTranslations } from '@/src/types/api.types';

interface CreateDishFormProps<FormData extends FieldValues> {
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
    hasImageWatch: boolean;
    hasImageUrlWatch?: boolean;
    imageUrl?: string;
    imageFile?: File;
    isCreating: boolean;
    wasCreated: boolean;
    dishOptions: DishOption;
    mealOptions: MealOption[];
    mealTypeWatch: OnlyMealType;
    dish?: DetailedDishWithTranslations;
    ingredients: IngredientDataValue[];
    titleWatch: string;
    handleSubmit: UseFormHandleSubmit<FormData>;
    onEdit: SubmitHandler<FormData>;
    onSubmit: SubmitHandler<FormData>;
}

export function CreateDishForm({ control, errors, hasImageWatch, hasImageUrlWatch, imageUrl, imageFile, isCreating, wasCreated, dishOptions, mealOptions, mealTypeWatch, dish, ingredients, titleWatch, handleSubmit, onEdit, onSubmit }: CreateDishFormProps<DishFormData>) {
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
                                },
                                validate: {
                                    typeofNumber: (value: string) => !isNaN(Number(value)) ? true : 'Podaj liczbę minut',
                                    integerValue: (value: string) => !isNaN(Number(value)) && !value.includes('.') ? true : 'Podaj liczbę całkowitą'
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
                                                value: /^((http|https):\/\/)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/,
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
                                                <div style={{ marginTop: '16px' }}>
                                                    <DishImage provider={'yummy'} title={titleWatch} imgUrl={imageUrl} />
                                                </div>
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
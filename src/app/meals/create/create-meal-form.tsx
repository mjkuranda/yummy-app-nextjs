'use client';

import { MealFormData } from '@/src/types/meal.types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from '@/styles/app/meals/create/create-meal-form.module.scss';
import { Loader } from '@/src/components/common/loader';
import { InputString } from '@/src/components/common/form/input-string';
import { Button } from '@/src/components/common/button';
import { InputList } from '@/src/components/common/form/input-list';
import { InputImage } from '@/src/components/common/form/input-image';
import { InputSelect } from '@/src/components/common/form/input-select';

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
    type: 'main course'
};

export function CreateMealForm() {
    const { handleSubmit, control, formState: { errors }, reset } = useForm<MealFormData>({ defaultValues, mode: 'onChange' });
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [wasCreated, setWasCreated] = useState<boolean>(false);

    const onSubmit: SubmitHandler<MealFormData> = async (data, e) => {
        e?.preventDefault();
        console.log(data);
    };

    return (
        <form className={styles['create-meal-form']}>
            {isCreating && <Loader isAbsolute={true} />}
            <h2>Create a new meal</h2>
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
            <Controller
                name={'description'}
                control={control}
                rules={{
                    required: 'Description is required',
                    minLength: 8,
                    maxLength: 1024
                }}
                render={({ field: { onChange, value } }) => (
                    <InputString label={'Type description'} value={value} setValue={onChange} error={errors.description} />
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
                name={'imageFile'}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <InputImage id={'meal-image'} image={value} setImage={onChange} width="50%" />
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
            {/*<Controller*/}
            {/*    name={'repeatedPassword'}*/}
            {/*    control={control}*/}
            {/*    rules={{ required: 'Repeated password is required', validate: validateRepeatedPasswordMatch }}*/}
            {/*    render={({ field: { onChange, value } }) => (*/}
            {/*        <InputPassword label={'Type your repeated password'} value={value} setValue={onChange} error={errors.repeatedPassword} />*/}
            {/*    )}*/}
            {/*/>*/}
            <Button label={'Create'} onClick={handleSubmit(onSubmit)} />
            {wasCreated && 'User has been created. Check out your mail box to activate your account.'}
        </form>
    );
}
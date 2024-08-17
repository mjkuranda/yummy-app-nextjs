'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UserData } from '@/src/types/register.types';
import styles from '@/styles/app/users/registration/registration-form.module.scss';
import { InputString } from '@/src/components/common/form/input-string';
import { Button } from '@/src/components/common/button';
import { InputPassword } from '@/src/components/common/form/input-password';

const defaultValues: UserData = {
    email: '',
    login: '',
    password: '',
    repeatedPassword: ''
};

export function RegistrationForm() {
    const { handleSubmit, control, formState: { errors } } = useForm<UserData>({ defaultValues });

    const onSubmit: SubmitHandler<UserData> = (data, e) => {
        e?.preventDefault();
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['registration-form']}>
            <Controller
                name={'email'}
                control={control}
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address'
                    }
                }}
                render={({ field: { onChange, value } }) => (
                    <InputString label={'Type your email'} value={value} setValue={onChange} error={errors.email} />
                )}
            />
            <Controller
                name={'login'}
                control={control}
                rules={{ required: 'Login is required' }}
                render={({ field: { onChange, value } }) => (
                    <InputString label={'Type your login'} value={value} setValue={onChange} error={errors.login} />
                )}
            />
            <Controller
                name={'password'}
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field: { onChange, value } }) => (
                    <InputPassword label={'Type your password'} value={value} setValue={onChange} error={errors.password} />
                )}
            />
            <Controller
                name={'repeatedPassword'}
                control={control}
                rules={{ required: 'Repeated password is required' }}
                render={({ field: { onChange, value } }) => (
                    <InputPassword label={'Type your repeated password'} value={value} setValue={onChange} error={errors.repeatedPassword} />
                )}
            />
            <Button label={'Create'} type="submit" />
        </form>
    );
}
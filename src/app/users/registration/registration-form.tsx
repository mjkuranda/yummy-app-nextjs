'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UserData } from '@/src/types/register.types';
import styles from '@/styles/app/users/registration/registration-form.module.scss';
import { InputString } from '@/src/components/common/form/input-string';
import { Button } from '@/src/components/common/button';
import { InputPassword } from '@/src/components/common/form/input-password';
import { BackLink } from '@/src/components/common/back-link';
import { useEffect, useState } from 'react';
import { createUserAccount } from '@/src/api/api';
import { toastError, toastSuccess } from '@/src/utils/toast.utils';
import { Loader } from '@/src/components/common/loader';

const defaultValues: UserData = {
    email: '',
    login: '',
    password: '',
    repeatedPassword: ''
};

export function RegistrationForm() {
    const { handleSubmit, control, formState: { errors }, watch, reset, setValue, clearErrors } = useForm<UserData>({ defaultValues, mode: 'onChange' });
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [wasCreated, setWasCreated] = useState<boolean>(false);

    useEffect(() => {
        const repeatedPassword = watch('repeatedPassword');

        if (repeatedPassword.length === 0) {
            return;
        }

        clearErrors('repeatedPassword');
        setValue('repeatedPassword', repeatedPassword, { shouldValidate: true });
    }, [watch('password')]);

    const onSubmit: SubmitHandler<UserData> = async (data, e) => {
        e?.preventDefault();
        setIsRegistering(true);

        try {
            await createUserAccount({ ...data });
            toastSuccess('Successfully created new account!');
            setWasCreated(true);
            reset();
        } catch (err: any) {
            toastError(err.message);
        } finally {
            setIsRegistering(false);
        }
    };

    const validateRepeatedPasswordMatch = (value: string) => {
        const password = watch('password');

        return value === password ? true : 'Passwords do not match';
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['registration-form']}>
            {isRegistering && <Loader isAbsolute={true} />}
            <BackLink link="/users/login" label={'Back to sign in'} isAttached={true} />
            <h2>Create a new user account</h2>
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
                rules={{ required: 'Repeated password is required', validate: validateRepeatedPasswordMatch }}
                render={({ field: { onChange, value } }) => (
                    <InputPassword label={'Type your repeated password'} value={value} setValue={onChange} error={errors.repeatedPassword} />
                )}
            />
            <Button label={'Sign up'} type="submit" />
            {wasCreated && 'User has been created. Check out your mail box to activate your account.'}
        </form>
    );
}
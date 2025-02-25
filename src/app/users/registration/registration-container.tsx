'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserData } from '@/src/types/register.types';
import { useEffect, useState } from 'react';
import { changeUserPassword, createUserAccount } from '@/src/api/api';
import { toastError, toastSuccess } from '@/src/utils/toast.utils';
import { RegistrationForm } from '@/src/app/users/registration/registration-form';

interface RegistrationFormProps {
    isResetting?: boolean;
}

const defaultValues: UserData = {
    email: '',
    login: '',
    password: '',
    repeatedPassword: ''
};

export function RegistrationContainer({ isResetting }: RegistrationFormProps) {
    const router = useRouter();
    const { handleSubmit, control, formState: { errors }, watch, reset, setValue, clearErrors } = useForm<UserData>({ defaultValues, mode: 'onChange' });
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [wasCreated, setWasCreated] = useState<boolean>(false);

    const isValid = Object.keys(errors).length === 0;

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
            toastSuccess('Pomyślnie utworzono nowe konto!');
            setWasCreated(true);
            reset();
        } catch (err: any) {
            toastError(err.message);
        } finally {
            setIsRegistering(false);
        }
    };

    const onReset: SubmitHandler<UserData> = async (data, e) => {
        e?.preventDefault();
        setIsRegistering(true); // is changing password, not registering :>

        if (data.password.length === 0 || data.repeatedPassword.length === 0) {
            toastError('Oba hasła muszą być identyczne.');

            return;
        }

        try {
            await changeUserPassword(data.password);

            toastSuccess('Pomyślnie zmieniono hasło!');
            router.push('/');
        } catch (err: any) {
            toastError(err);
        } finally {
            setIsRegistering(false);
        }
    };

    const validateRepeatedPasswordMatch = (value: string) => {
        const password = watch('password');

        return value === password ? true : 'Hasła nie są identyczne';
    };

    return (
        <RegistrationForm
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            validateRepeatedPasswordMatch={validateRepeatedPasswordMatch}
            isRegistering={isRegistering}
            isValid={isValid}
            wasCreated={wasCreated}
            onReset={onReset}
            onSubmit={onSubmit}
            isResetting={isResetting}
        />
    );
}
'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UserData } from '@/src/types/register.types';
import styles from '@/styles/app/users/registration/registration-form.module.scss';
import { InputString } from '@/src/components/common/form/input-string';
import { Button } from '@/src/components/common/button';
import { InputPassword } from '@/src/components/common/form/input-password';
import { BackLink } from '@/src/components/common/back-link';
import { useEffect, useMemo, useState } from 'react';
import { createUserAccount } from '@/src/api/api';
import { toastError, toastSuccess } from '@/src/utils/toast.utils';
import { Loader } from '@/src/components/common/loader';
import { useRouter, useSearchParams } from 'next/navigation';

const defaultValues: UserData = {
    email: '',
    login: '',
    password: '',
    repeatedPassword: ''
};

export function RegistrationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isResetting = useMemo(() => Boolean(searchParams.get('action') === 'reset'), [searchParams.get('action')]);
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
            toastSuccess('Pomyślnie utworzono nowe konto!');
            setWasCreated(true);
            reset();
        } catch (err: any) {
            toastError(err.message);
        } finally {
            setIsRegistering(false);
        }
    };

    const onReset = async () => {
        // TODO: Implement

        toastSuccess('Pomyślnie zmieniono hasło!');
        router.push('/');
    };

    const validateRepeatedPasswordMatch = (value: string) => {
        const password = watch('password');

        return value === password ? true : 'Hasła nie są identyczne';
    };

    return (
        <form onSubmit={handleSubmit(isResetting ? onReset : onSubmit)} className={styles['registration-form']}>
            {isRegistering && <Loader isAbsolute={true} />}
            {isResetting
                ? <BackLink link="/" label={'Powrót do strony głównej'} isAttached={true} />
                : <BackLink link="/users/login" label={'Powrót do logowania'} isAttached={true} />
            }
            <h2>{isResetting ? 'Zmień hasło' : 'Stwórz nowe konto'}</h2>
            {!isResetting && (
                <>
                    <Controller
                        name={'email'}
                        control={control}
                        rules={{
                            required: 'Adres email jest wymagany',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Niepoprawny adres email'
                            },
                            minLength: {
                                value: 6,
                                message: 'Długość adresu email nie może być krótsze niż 6 znaków'
                            },
                            maxLength: {
                                value: 48,
                                message: 'Długość adresu email nie może być dłuższe niż 48 znaków'
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputString label={'Email'} value={value} setValue={onChange} error={errors.email}
                                variant="outlined" width="25%" />
                        )}
                    />
                    <Controller
                        name={'login'}
                        control={control}
                        rules={{
                            required: 'Login jest wymagany',
                            minLength: {
                                value: 4,
                                message: 'Login nie może być krótszy niż 4 znaki'
                            },
                            maxLength: {
                                value: 32,
                                message: 'Login nie może być dłuzszy niż 32 znaki'
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputString label={'Login'} value={value} setValue={onChange} error={errors.login}
                                variant="outlined" width="25%" />
                        )}
                    />
                </>
            )}
            <Controller
                name={'password'}
                control={control}
                rules={{
                    required: 'Hasło jest wymagane',
                    pattern: {
                        value: /(?=.*[0-9])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~])/,
                        message: 'Hasło powinno zawierać co najmniej 8 znaków, 1 cyfrę i 1 znak specjalny'
                    }
                }}
                render={({ field: { onChange, value } }) => (
                    <InputPassword label={isResetting ? 'Nowe hasło' : 'Hasło'} value={value} setValue={onChange} error={errors.password} width="25%" />
                )}
            />
            <Controller
                name={'repeatedPassword'}
                control={control}
                rules={{ required: 'Powtórzone hasło jest wymagane', validate: validateRepeatedPasswordMatch }}
                render={({ field: { onChange, value } }) => (
                    <InputPassword label={isResetting ? 'Powtórz nowe hasło' : 'Powtórz hasło'} value={value} setValue={onChange} error={errors.repeatedPassword} width="25%" />
                )}
            />
            <Button label={isResetting ? 'Zmień hasło' : 'Zarejestruj się'} type="submit" />
            {wasCreated && 'Użytkownik został utworzony. Sprawdź swoją skrzynkę mailową, aby aktywować swoje konto.'}
        </form>
    );
}
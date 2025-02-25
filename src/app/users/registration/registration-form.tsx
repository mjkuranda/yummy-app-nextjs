'use client';

import {
    Control,
    Controller,
    DeepRequired,
    FieldErrorsImpl,
    GlobalError,
    SubmitErrorHandler,
    SubmitHandler
} from 'react-hook-form';
import styles from '@/styles/app/users/registration/registration-form.module.scss';
import { InputString } from '@/src/components/common/form/input-string';
import { Button } from '@/src/components/common/buttons/button';
import { InputPassword } from '@/src/components/common/form/input-password';
import { Loader } from '@/src/components/common/loader';
import { BaseSyntheticEvent } from 'react';
import { UserData } from '@/src/types/register.types';

interface RegistrationFormProps {
    control: Control<UserData>;
    errors:  Partial<FieldErrorsImpl<DeepRequired<UserData>>> & {root?: Record<string, GlobalError> & GlobalError};
    handleSubmit: (onValid: SubmitHandler<UserData>, onInvalid?: SubmitErrorHandler<UserData>) => (e?: BaseSyntheticEvent) => Promise<void>;
    validateRepeatedPasswordMatch: (value: string) => boolean | string;
    isRegistering: boolean;
    isValid: boolean;
    wasCreated: boolean;
    onReset: SubmitHandler<UserData>;
    onSubmit: SubmitHandler<UserData>;
    isResetting?: boolean;
}

export function RegistrationForm({ control, errors, handleSubmit, validateRepeatedPasswordMatch, isRegistering, isValid, wasCreated, onReset, onSubmit, isResetting }: RegistrationFormProps) {
    return (
        <form onSubmit={handleSubmit(isResetting ? onReset : onSubmit)} className={styles['registration-form']}>
            {isRegistering && <Loader isAbsolute={true} />}
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
                                variant="outlined" />
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
                                variant="outlined" />
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
                    <InputPassword label={isResetting ? 'Nowe hasło' : 'Hasło'} value={value} setValue={onChange} error={errors.password} width="100%" />
                )}
            />
            <Controller
                name={'repeatedPassword'}
                control={control}
                rules={{ required: 'Powtórzone hasło jest wymagane', validate: validateRepeatedPasswordMatch }}
                render={({ field: { onChange, value } }) => (
                    <InputPassword label={isResetting ? 'Powtórz nowe hasło' : 'Powtórz hasło'} value={value} setValue={onChange} error={errors.repeatedPassword} width="100%" />
                )}
            />
            <div className={styles['registration-form-container']}>
                <Button label={isResetting ? 'Zmień hasło' : 'Zarejestruj się'} type="submit" disabled={!isValid} width="100%" />
                {wasCreated && <p className={styles['account-creating-notification-text']}>Użytkownik został utworzony. Sprawdź swoją skrzynkę mailową, aby aktywować swoje konto.</p>}
            </div>
        </form>
    );
}
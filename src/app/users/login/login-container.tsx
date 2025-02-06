'use client';

import { FormEvent, useState } from 'react';
import { useUserContext } from '@/src/contexts/user.context';
import { doUserLogin } from '@/src/api/api';
import { toastError, toastSuccess } from '@/src/utils/toast.utils';
import { LoginForm } from '@/src/app/users/login/login-form';

export function LoginContainer() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogging, setIsLogging] = useState<boolean>(false);
    const { loginUser } = useUserContext();

    const onLogIn = async () => {
        setIsLogging(true);

        try {
            const permissions = await doUserLogin(login, password);
            loginUser(login, permissions);

            toastSuccess('Pomyślnie zalogowano');
        } catch (err: any) {
            toastError(err.message);
        } finally {
            setIsLogging(false);
        }
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        await onLogIn();
    };

    return (
        <LoginForm
            login={login}
            password={password}
            isLogging={isLogging}
            setLogin={setLogin}
            setPassword={setPassword}
            onSubmit={onSubmit}
        />
    );
}
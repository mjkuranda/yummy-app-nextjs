'use client';

import { FormEvent, useState } from 'react';
import { useUserContext } from '@/src/contexts/user.context';
import { doUserLogin } from '@/src/api/api';
import { toastSuccess } from '@/src/utils/toast.utils';
import { LoginForm } from '@/src/app/users/login/login-form';
import { handleApiError } from '@/src/api/api-errors';
import { useRouter } from 'next/navigation';

export function LoginContainer() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogging, setIsLogging] = useState<boolean>(false);
    const userContext = useUserContext();
    const router = useRouter();

    const { loginUser } = userContext;

    const onLogIn = async () => {
        setIsLogging(true);

        try {
            const permissions = await doUserLogin(login, password);
            loginUser(login, permissions);

            toastSuccess('Pomyślnie zalogowano');
        } catch (err: any) {
            handleApiError(err.message, router, userContext);
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
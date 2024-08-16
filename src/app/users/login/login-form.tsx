'use client';

import { InputString } from '@/src/components/common/form/input-string';
import { InputPassword } from '@/src/components/common/form/input-password';
import { FormEvent, useState } from 'react';
import { Button } from '@/src/components/common/button';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/src/contexts/user.context';
import { doUserLogin } from '@/src/api/api';

import styles from '@/styles/app/users/login/page.module.scss';
import { toastError, toastSuccess } from '@/src/utils/toast.utils';

export function LoginForm() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    const { loginUser, isLoggedIn } = useUserContext();

    if (isLoggedIn()) {
        router.push('/');
    }

    const onLogIn = async () => {
        try {
            const permissions = await doUserLogin(login, password);
            loginUser(login, permissions);

            toastSuccess('Successfully logged in!');
            router.push('/');
        } catch (err: any) {
            toastError(err.message);
        }
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onLogIn();
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <div>
                    <h3>Input your login and password</h3>
                </div>
                <div className={styles['form-control-container']}>
                    <InputString label={'Input your login'} value={login} setValue={setLogin} />
                </div>
                <div className={styles['form-control-container']}>
                    <InputPassword label={'Input your password'} value={password} setValue={setPassword} />
                </div>
                <div className={styles['form-control-container']}>
                    <Button label={'Log in'} type="submit" />
                </div>
            </div>
        </form>
    );
}
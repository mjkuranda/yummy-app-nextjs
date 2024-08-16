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
import { Loader } from '@/src/components/common/loader';

export function LoginForm() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogging, setIsLogging] = useState<boolean>(false);
    const router = useRouter();
    const { loginUser, isLoggedIn } = useUserContext();

    if (isLoggedIn()) {
        router.push('/');
    }

    const onLogIn = async () => {
        setIsLogging(true);

        try {
            const permissions = await doUserLogin(login, password);
            loginUser(login, permissions);

            toastSuccess('Successfully logged in!');
            router.push('/');
        } catch (err: any) {
            toastError(err.message);
        } finally {
            setIsLogging(false);
        }
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onLogIn();
    };

    return (
        <form onSubmit={onSubmit}>
            {isLogging && <Loader isAbsolute={true} />}
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
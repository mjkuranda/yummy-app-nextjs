'use client';

import styles from '@/styles/app/users/login/page.module.scss';
import { InputString } from '@/src/components/common/form/input-string';
import { InputPassword } from '@/src/components/common/form/input-password';
import { FormEvent, useState } from 'react';
import { Button } from '@/src/components/common/button';
import { useUserContext } from '@/src/contexts/user.context';
import { doUserLogin } from '@/src/api/api';
import { toastError, toastSuccess } from '@/src/utils/toast.utils';
import { Loader } from '@/src/components/common/loader';
import Link from 'next/link';

export function LoginForm() {
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

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onLogIn();
    };

    return (
        <form onSubmit={onSubmit}>
            {isLogging && <Loader isAbsolute={true} />}
            {/*<BackLinkBar link="/" label={'Powrót do strony głównej'} isAttached={true} />*/}
            <div>
                <div>
                    <h3>Zaloguj się</h3>
                </div>
                <div className={styles['form-control-container']}>
                    <InputString label={'Login'} value={login} setValue={setLogin} variant="outlined" width="95%" />
                </div>
                <div className={styles['form-control-container']}>
                    <InputPassword label={'Hasło'} value={password} setValue={setPassword} width="100%" />
                </div>
                <div className={styles['form-control-container']}>
                    <div className={styles['form-control-container-wrapper']}>
                        <Button label={'Zaloguj się'} type="submit" />
                        <p className="mt-3">Nie masz konta? <Link href={'/users/registration'}>Zarejestruj się</Link></p>
                    </div>
                </div>
            </div>
        </form>
    );
}
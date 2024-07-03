'use client';

import { InputString } from '@/src/components/common/form/input-string';
import { InputPassword } from '@/src/components/common/form/input-password';
import { useState } from 'react';
import styles from '@/styles/app/users/login/page.module.scss';
import { Button } from '@/src/components/common/button';

export function LoginForm() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onLogIn = () => {
        console.log(`Attempt to log in, using ${login} and ${password}`);
    };

    return (
        <form>
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
                    <Button label={'Log in'} onClick={onLogIn} />
                </div>
            </div>
        </form>
    );
}
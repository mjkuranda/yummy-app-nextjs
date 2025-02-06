import styles from '@/styles/app/users/login/page.module.scss';
import { InputString } from '@/src/components/common/form/input-string';
import { InputPassword } from '@/src/components/common/form/input-password';
import { Button } from '@/src/components/common/button';
import { Loader } from '@/src/components/common/loader';
import Link from 'next/link';
import { Dispatch, FormEvent, SetStateAction } from 'react';

interface LoginFormProps {
    login: string;
    password: string;
    isLogging: boolean;
    setLogin: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function LoginForm({ login, password, isLogging, setLogin, setPassword, onSubmit }: LoginFormProps) {
    return (
        <form className={styles['form-control']} onSubmit={onSubmit}>
            {isLogging && <Loader isAbsolute={true} />}
            <div>
                <div>
                    <h3>Zaloguj się do swojego konta</h3>
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
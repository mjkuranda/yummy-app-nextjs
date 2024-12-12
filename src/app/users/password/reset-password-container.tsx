'use client';

import styles from '@/styles/app/users/password/page.module.scss';
import { useState } from 'react';
import { InputString } from '@/src/components/common/form/input-string';
import { Button } from '@/src/components/common/button';
import { toastSuccess } from '@/src/utils/toast.utils';
import { useRouter } from 'next/navigation';
import { Loader } from '@/src/components/common/loader';
import { BackLink } from '@/src/components/common/back-link';

export function ResetPasswordContainer() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState<string>('');
    const [repeatedNewPassword, setRepeatedNewPassword] = useState<string>('');

    // TODO: Implement matching both passwords!

    const onReset = async () => {
        // TODO: Implement...

        toastSuccess('Pomyślnie zresetowano hasło!');
        router.push('/users/login');
    };

    return (
        <form className={styles['reset-password-container']}>
            {/* TODO: isResetting = false below */}
            {false && <Loader isAbsolute={true} />}
            <BackLink link="/users/login" label={'Powrót do logowania'} isAttached={true} />
            <div className={styles['reset-password-container-box']}>
                <h3>Zresetuj swoje hasło:</h3>
                <InputString label={'Nowe hasło'} value={newPassword} setValue={setNewPassword} variant="outlined" />
                <InputString label={'Powtórz nowe hasło'} value={repeatedNewPassword} setValue={setRepeatedNewPassword} variant="outlined" />
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <Button label={'Zresetuj'} onClick={onReset} />
                </div>
            </div>
        </form>
    );
}
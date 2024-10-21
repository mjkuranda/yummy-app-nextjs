'use client';

import styles from '@/styles/app/not-found.module.scss';
import { useParams } from 'next/navigation';
import { useActivateUser } from '@/src/hooks/use-activate-user';
import { Loader } from '@/src/components/common/loader';
import Link from 'next/link';

export function ActivationContainer() {
    const { activationCode } = useParams<{ activationCode: string }>();
    const { wasActivated, isProceeding, errorMessage } = useActivateUser(activationCode);

    return (
        <div className={styles['not-found__info']}>
            <div>
                {isProceeding
                    ? <Loader />
                    : wasActivated
                        ? <>
                            <p className="text-success text-center">Użytkownik aktywowany!</p>
                            <p className="text-success text-center">Możesz się <Link href="/users/login">zalogować.</Link></p>
                        </>
                        : <>
                            <p className="text-danger text-center">{errorMessage}</p>
                            <p className="text-danger text-center"><Link href="/">Powrót do strony głównej</Link></p>
                        </>
                }
            </div>
        </div>
    );
}
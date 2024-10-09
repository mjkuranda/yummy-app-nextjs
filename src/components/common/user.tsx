'use client';

import { Button } from '@/src/components/common/button';
import { useUserContext } from '@/src/contexts/user.context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader } from '@/src/components/common/loader';
import { toastSuccess } from '@/src/utils/toast.utils';

export function User() {
    const { isLoggedIn, logoutUser, isFetching, user } = useUserContext();
    const router = useRouter();

    const onLogout = () => {
        router.push('/users/login');
        logoutUser();
        toastSuccess('Pomyślnie wylogowano');
    };

    const hasCapability = () => {
        const parsedUser = JSON.parse(localStorage.getItem('user') ?? '');
        let _user = { ...user };

        if (parsedUser?.user?.login !== user.login) {
            _user = { ...parsedUser };
        }

        if (_user.isAdmin) {
            return true;
        }

        if (_user.capabilities?.canAdd || _user.capabilities?.canEdit || _user.capabilities?.canDelete) {
            return true;
        }

        return false;
    };

    if (isFetching) {
        return (
            <div className="user">
                <Loader />
            </div>
        );
    }

    return (
        <div className="user">
            {isLoggedIn()
                ? (
                    <>
                        {hasCapability() && <Link href={'/manage'}>Zarządzaj</Link>}
                        &nbsp;&nbsp;&nbsp;
                        <Button label={'Wyloguj się'} onClick={onLogout} />
                    </>
                )
                : <Button label="Zaloguj się" link="/users/login" />
            }
        </div>
    );
}
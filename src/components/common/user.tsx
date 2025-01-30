'use client';

import { Button } from '@/src/components/common/button';
import { useUserContext } from '@/src/contexts/user.context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader } from '@/src/components/common/loader';
import { toastSuccess } from '@/src/utils/toast.utils';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

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
                        <Link href={'/users/change-password'} style={{ color: 'white' }}>Zmień hasło <VpnKeyIcon /></Link>
                        &nbsp;&nbsp;&nbsp;
                        {hasCapability() && <Link href={'/manage'} style={{ color: 'white' }}>Zarządzaj <ManageAccountsIcon /></Link>}
                        &nbsp;&nbsp;&nbsp;
                        <Button label="Wyloguj się" icon="log out" onClick={onLogout} />
                    </>
                )
                : <Button label="Zaloguj się" icon="log in" link="/users/login" />
            }
        </div>
    );
}
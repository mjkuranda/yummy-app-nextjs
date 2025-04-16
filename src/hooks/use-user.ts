'use client';

import { toastSuccess } from '@/src/utils/toast.utils';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/src/contexts/user.context';
import { useCallback } from 'react';

export function useUser() {
    const { isLoggedIn, logoutUser, isFetching, user } = useUserContext();
    const router = useRouter();

    const onLogout = useCallback(() => {
        router.push('/users/login');
        logoutUser();
        toastSuccess('Pomyślnie wylogowano');
    }, []);

    const hasCapability = useCallback(() => {
        const parsedUser = JSON.parse(localStorage.getItem('user') ?? '{}');
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
    }, [user.login]);

    return { isLoggedIn, onLogout, hasCapability, isFetching, user };
}
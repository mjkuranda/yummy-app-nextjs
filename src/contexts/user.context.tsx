'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CurrentUser } from '@/src/types/user.types';
import { UserPermissions } from '@/src/types/api.types';
import { MINUTE } from '@/src/constants/numbers';
import { refreshUserTokens } from '@/src/api/api';
import { ApiError, handleApiError } from '@/src/api/api-errors';
import { useRouter } from 'next/navigation';

export interface UserContextValues {
    user: CurrentUser;
    isFetching: boolean;
    loginUser: (login: string, permissions: UserPermissions) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
}

const defaultValue: UserContextValues = {
    user: {
        login: ''
    },
    isFetching: true,
    loginUser: () => {},
    logoutUser: () => {},
    isLoggedIn: (): boolean => false
};

const UserContext = createContext<UserContextValues>(defaultValue);

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }: { children: any }) {
    const router = useRouter();
    const [user, setUser] = useState<CurrentUser>({
        login: ''
    });
    const [contextValue, setContextValue] = useState<UserContextValues>(defaultValue);
    const [isFetching, setIsFetching] = useState<boolean>(true);

    const intervalHandler = useCallback(() => {
        if (user.login === '') {
            return;
        }

        refreshUserTokens()
            .catch(err => {
                if (err instanceof ApiError) {
                    handleApiError(err, router, contextValue);
                }
            });
    }, [user.login]);

    useEffect(() => {
        const loginUser = (login: string, permissions: UserPermissions): void => {
            const user: CurrentUser = { login, ...permissions };
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        };

        const logoutUser = (): void => {
            const user: CurrentUser = { login: '' };
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        };

        const isLoggedIn = (): boolean => {
            if (!localStorage.getItem('user')) {
                return false;
            }

            const stringifiedUser = localStorage.getItem('user') as string;
            const user: CurrentUser = JSON.parse(stringifiedUser);

            return Boolean(user.login !== '');
        };

        const fetchUser = (): void => {
            const stringifiedUser = localStorage.getItem('user') as string;
            const user: CurrentUser = JSON.parse(stringifiedUser);

            setUser(user);
            setContextValue({ user, loginUser, logoutUser, isLoggedIn, isFetching: false });
            setIsFetching(false);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const interval = setInterval(intervalHandler, 5 * MINUTE);

        return () => clearInterval(interval);
    }, [user.login]);

    if (isFetching) {
        return children;
    }

    return (
        <UserContext.Provider value={contextValue ?? defaultValue}>
            {children}
        </UserContext.Provider>
    );
}
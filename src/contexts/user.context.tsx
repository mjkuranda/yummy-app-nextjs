'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { CurrentUser } from '@/src/types/user.types';
import { UserPermissions } from '@/src/types/api.types';
import { MINUTE } from '@/src/constants/numbers';
import { refreshUserTokens } from '@/src/api/api';
import { ApiError, handleApiError } from '@/src/api/api-errors';
import { useRouter } from 'next/navigation';
import { Loader } from '@/src/components/common/loader';

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

export function UserProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<CurrentUser>({
        login: ''
    });
    const [isLogging, setIsLogging] = useState<boolean>(false);
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
        const pathname = location.pathname;

        if (pathname === '/users/login' && user.login !== '') {
            router.push('/');
        }
    }, [isLogging, user]);

    useEffect(() => {
        const loginUser = (login: string, permissions: UserPermissions): void => {
            setIsLogging(true);
            const user: CurrentUser = { login, ...permissions };
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setIsLogging(false);
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
            let user: CurrentUser = {
                login: ''
            };

            if (stringifiedUser !== null) {
                user = JSON.parse(stringifiedUser);
            }

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
            {isLogging || isFetching && <Loader isAbsolute={true} />}
            {children}
        </UserContext.Provider>
    );
}
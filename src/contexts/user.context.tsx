'use client';

import { createContext, useContext, useState } from 'react';
import { CurrentUser } from '@/src/types/user.types';
import { UserPermissions } from '@/src/types/api.types';

interface UserContextValues {
    user: CurrentUser;
    loginUser: (login: string, permissions: UserPermissions) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
}

const defaultValue: UserContextValues = {
    user: {
        login: ''
    },
    loginUser: () => {},
    logoutUser: () => {},
    isLoggedIn: (): boolean => false
};

const UserContext = createContext<UserContextValues>(defaultValue);

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }: { children: any }) {
    const [user, setUser] = useState<CurrentUser>({
        login: ''
    });

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

    const contextValue: UserContextValues = { user, loginUser, logoutUser, isLoggedIn };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
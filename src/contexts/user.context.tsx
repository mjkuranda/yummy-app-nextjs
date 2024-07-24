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

    const loginUser = (login: string, permissions: UserPermissions): void => setUser({ login, ...permissions });

    const logoutUser = (): void => setUser({ login: '' });

    const isLoggedIn = (): boolean => Boolean(user.login !== '');

    const contextValue: UserContextValues = { user, loginUser, logoutUser, isLoggedIn };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
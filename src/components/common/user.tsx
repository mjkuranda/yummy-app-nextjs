'use client';

import { Button } from '@/src/components/common/button';
import { useUserContext } from '@/src/contexts/user.context';
import { useRouter } from 'next/navigation';

export function User() {
    const { isLoggedIn, logoutUser } = useUserContext();
    const router = useRouter();

    const onLogout = () => {
        router.push('/users/login');
        logoutUser();
    };

    return (
        <div className="user">
            {isLoggedIn()
                ? <Button label={'Logout'} onClick={onLogout} />
                : <Button label={'Login'} link="/users/login" />
            }
        </div>
    );
}
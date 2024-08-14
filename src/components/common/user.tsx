'use client';

import { Button } from '@/src/components/common/button';
import { useUserContext } from '@/src/contexts/user.context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
                ? (
                    <>
                        <Link href={'/management'}>Manage</Link>
                        &nbsp;&nbsp;&nbsp;
                        <Button label={'Logout'} onClick={onLogout} />
                    </>
                )
                : <Button label={'Login'} link="/users/login" />
            }
        </div>
    );
}
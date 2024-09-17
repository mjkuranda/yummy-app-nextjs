'use client';

import { Button } from '@/src/components/common/button';
import { useUserContext } from '@/src/contexts/user.context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader } from '@/src/components/common/loader';

export function User() {
    const { isLoggedIn, logoutUser, isFetching, user } = useUserContext();
    const router = useRouter();

    const onLogout = () => {
        router.push('/users/login');
        logoutUser();
    };

    const hasCapability = () => {
        if (user.isAdmin) {
            return true;
        }

        if (user.capabilities?.canAdd || user.capabilities?.canEdit || user.capabilities?.canDelete) {
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
                        {hasCapability() && <Link href={'/manage'}>Manage</Link>}
                        &nbsp;&nbsp;&nbsp;
                        <Button label={'Logout'} onClick={onLogout} />
                    </>
                )
                : <Button label="Zaloguj się" link="/users/login" />
            }
        </div>
    );
}
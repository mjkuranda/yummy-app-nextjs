'use client';

import { Button } from '@/src/components/common/button';
import { useUserContext } from '@/src/contexts/user.context';

export function User() {
    const { user } = useUserContext();

    return (
        <div className="user">
            {user.login}
            <Button label={'Login'} link="/users/login" />
        </div>
    );
}
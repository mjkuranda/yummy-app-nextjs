'use client';

import { useGetProfile } from '@/src/hooks/use-get-profile';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { UserProfileTile } from '@/src/app/users/[login]/profile/user-profile';
import { UserProfile } from '@/src/types/api.types';
import { Suspense } from 'react';
import { BackLinkBar } from '@/src/components/common/back-link-bar';

interface ProfilePageParams extends Params {
    login: string;
}

export function UserProfileContainer() {
    const { login } = useParams<ProfilePageParams>();
    const { profile, isLoading } = useGetProfile(login);
    const searchParams = useSearchParams();
    const router = useRouter();
    const dishId = searchParams.get('dishId');

    if (!profile && !isLoading) {
        return router.push('/');
    }

    const userProfile: UserProfile = profile || {
        login: 'Twój login',
        activated: Date.now(),
        dishList: []
    };

    return (
        <Suspense>
            {dishId && <BackLinkBar link={`/dishes/${dishId}`} label={'Wróć do dania'} />}
            <UserProfileTile isLoading={isLoading} profile={userProfile} />
        </Suspense>
    );
}
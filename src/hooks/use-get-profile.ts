'use client';

import { UserProfile } from '@/src/types/api.types';
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/src/api/api';

export function useGetProfile(login: string): { profile?: UserProfile, isLoading: boolean } {
    const [profile, setProfile] = useState<UserProfile>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!isLoading) {
            return;
        }

        getUserProfile(login)
            .then(profile => setProfile(profile))
            .catch(() => {})
            .finally(() => setIsLoading(false));
    }, []);

    return {
        profile,
        isLoading
    };
}
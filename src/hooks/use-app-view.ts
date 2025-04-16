'use client';

import { useMediaQuery } from '@mui/material';

interface AppView {
    isMobile: boolean;
}

export function useAppView(): AppView {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return {
        isMobile
    };
}
'use client';

import { useEffect, useState } from 'react';
import { activateUser } from '@/src/api/api';

export function useActivateUser(activationCode: string): {
    isProceeding: boolean,
    wasActivated: boolean,
    errorMessage: string | null
} {
    const [isProceeding, setIsProceeding] = useState<boolean>(true);
    const [wasActivated, setWasActivated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!activationCode) {
            setIsProceeding(false);
            setWasActivated(false);

            return;
        }

        activateUser(activationCode)
            .then(() => setWasActivated(true))
            .catch(err => setErrorMessage(err.message))
            .finally(() => setIsProceeding(false));
    }, []);

    return { isProceeding, wasActivated, errorMessage };
}
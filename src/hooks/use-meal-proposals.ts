'use client';

import { useGetMealProposals } from '@/src/api/endpoints';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MealProposal } from '@/src/types/api.types';
import { ApiError, handleApiError } from '@/src/api/api-errors';
import { useUserContext } from '@/src/contexts/user.context';

export function useMealProposals() {
    const userContext = useUserContext();
    const { data: proposals, isLoading: isLoadingProposals, isError: isErrorProposals, error: errorProposals } = useGetMealProposals();
    const [currentProposalIdx, setCurrentProposalIdx] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        handleApiError(errorProposals as ApiError, router, userContext);
    }, [isErrorProposals]);

    const onPrevious = () => {
        if (currentProposalIdx === 0) {
            setCurrentProposalIdx((proposals?.length ?? 1) - 1);
        } else {
            setCurrentProposalIdx((currentProposalIdx - 1) % (proposals?.length ?? 1));
        }
    };

    const onNext = () => {
        setCurrentProposalIdx((currentProposalIdx + 1) % (proposals?.length ?? 1));
    };

    const onChoose = () => {
        if (proposals) {
            return router.push(`/result/${proposals[currentProposalIdx].id}`);
        }

        router.push('/');
    };

    const getCurrentProposal = (): MealProposal | null => {
        if (isLoadingProposals || isErrorProposals || proposals?.length === 0) {
            return null;
        }

        return proposals![currentProposalIdx];
    };

    return { proposals: proposals ?? [], onPrevious, onNext, onChoose, isLoadingProposals, isErrorProposals, getCurrentProposal };
}
'use client';

import { useGetMealProposals } from '@/src/api/endpoints';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MealProposal } from '@/src/types/api.types';

export function useMealProposals() {
    const { data: proposals, isLoading: isLoadingProposals, isError: isErrorProposals } = useGetMealProposals();
    const [currentProposalIdx, setCurrentProposalIdx] = useState<number>(0);
    const router = useRouter();

    const onNext = () => {
        setCurrentProposalIdx((currentProposalIdx + 1) % (proposals?.length ?? 0));
    };

    const onChoose = () => {
        if (proposals) {
            router.push(`/result/${proposals[currentProposalIdx]._id}`);
        }

        router.push('/');
    };

    const getCurrentProposal = (): MealProposal | null => {
        if (isLoadingProposals || isErrorProposals || proposals?.length === 0) {
            return null;
        }

        return proposals![currentProposalIdx];
    };

    return { proposals: proposals ?? [], onNext, onChoose, isLoadingProposals, isErrorProposals, getCurrentProposal };
}
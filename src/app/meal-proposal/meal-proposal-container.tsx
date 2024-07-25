'use client';

import styles from '@/styles/app/meal-proposal/page.module.scss';
import { MealProposalNavigator } from '@/src/app/meal-proposal/meal-proposal-navigator';
import { MealProposalItem } from '@/src/app/meal-proposal/meal-proposal-item';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Link from 'next/link';
import { useMealProposals } from '@/src/hooks/use-meal-proposals';
import { MealProposal } from '@/src/types/api.types';

export function MealProposalContainer() {
    const { onNext, onChoose, isLoadingProposals, isErrorProposals, getCurrentProposal } = useMealProposals();
    const currentProposal = getCurrentProposal() as MealProposal;

    if (isErrorProposals) {
        return <>Error occurred.</>;
    }

    if (isLoadingProposals) {
        return <>Loading...</>;
    }

    return (
        <div className={styles['meal-proposal-container']}>
            <MealProposalItem proposal={currentProposal} />
            <MealProposalNavigator onNext={onNext} onChoose={onChoose} />
            <div className={styles['meal-proposal-back-link']}>
                <Link href="/">
                    <ArrowCircleLeftIcon />Back to main page
                </Link>
            </div>
        </div>
    );
}
'use client';

import styles from '@/styles/app/meal-proposal/page.module.scss';
import { MealProposalNavigator } from '@/src/app/meal-proposal/meal-proposal-navigator';
import { MealProposalItem } from '@/src/app/meal-proposal/meal-proposal-item';
import { MealProposal } from '@/src/types/api.types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface MealProposalContainerProps {
    proposals: MealProposal[];
}

export function MealProposalContainer({ proposals }: MealProposalContainerProps) {
    const [currentProposal, setCurrentProposal] = useState<number>(0);
    const router = useRouter();

    const onNext = () => {
        setCurrentProposal((currentProposal + 1) % proposals.length);
        console.log('Next', currentProposal);
    };

    const onChoose = () => {
        router.push(`/result/${proposals[currentProposal]._id}`);
        console.log('Choose');
    };

    return (
        <div className={styles['meal-proposal-container']}>
            <MealProposalItem proposal={proposals[currentProposal]} />
            <MealProposalNavigator onNext={onNext} onChoose={onChoose} />
            <div className={styles['meal-proposal-back-link']}>
                <Link href="/">Back</Link>
            </div>
        </div>
    );
}
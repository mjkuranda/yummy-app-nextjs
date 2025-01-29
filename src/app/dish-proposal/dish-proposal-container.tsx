'use client';

import styles from '@/styles/app/dish-proposal/page.module.scss';
import { DishProposalNavigator } from '@/src/app/dish-proposal/dish-proposal-navigator';
import { DishProposalItem } from '@/src/app/dish-proposal/dish-proposal-item';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Link from 'next/link';
import { useDishProposals } from '@/src/hooks/use-dish-proposals';
import { DishProposal } from '@/src/types/api.types';
import { Loader } from '@/src/components/common/loader';

export function DishProposalContainer() {
    const { onNext, onPrevious, onChoose, isLoadingProposals, isErrorProposals, getCurrentProposal, getPreviousProposal, getNextProposal } = useDishProposals();
    const currentProposal = getCurrentProposal() as DishProposal;
    const previousProposal = getPreviousProposal() as DishProposal;
    const nextProposal = getNextProposal() as DishProposal;

    if (isErrorProposals) {
        return <>Wystąpił błąd.</>;
    }

    if (isLoadingProposals) {
        return <Loader isAbsolute={true} />;
    }

    return (
        <div className={styles['dish-proposal-container']}>
            <div className={styles['dish-proposal-nearby']}>
                {currentProposal ?
                    <>
                        <DishProposalItem proposal={previousProposal} isTransparent={true} />
                        <DishProposalItem proposal={currentProposal} isTransparent={false} />
                        <DishProposalItem proposal={nextProposal} isTransparent={true} />
                    </> :
                    <DishProposalItem proposal={currentProposal} isTransparent={false} />
                }
            </div>
            {currentProposal && <DishProposalNavigator onPrevious={onPrevious} onNext={onNext} onChoose={onChoose} />}
            <div className={styles['dish-proposal-back-link']}>
                <Link href="/">
                    <ArrowCircleLeftIcon />Powrót do strony głównej
                </Link>
            </div>
        </div>
    );
}
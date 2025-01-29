'use client';

import styles from '@/styles/app/dish-proposal/page.module.scss';
import { DishProposalNavigator } from '@/src/app/dish-proposal/dish-proposal-navigator';
import { DishProposalItem } from '@/src/app/dish-proposal/dish-proposal-item';
import { useDishProposals } from '@/src/hooks/use-dish-proposals';
import { DishProposal } from '@/src/types/api.types';
import { Loader } from '@/src/components/common/loader';
import { Button } from '@/src/components/common/button';
import { BackLinkBar } from '@/src/components/common/back-link-bar';

export function DishProposalContainer() {
    const { onNext, onPrevious, onChoose, isLoadingProposals, isErrorProposals, getCurrentProposal, getPreviousProposal, getNextProposal, currentProposalNumber, proposals } = useDishProposals();
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
            <div style={{ flex: 1, margin: '.5% .5% 0 .5%' }}>
                <BackLinkBar link="/" label={'Powrót do strony głównej'} />
            </div>
            <div className={styles['dish-proposal-nearby']}>
                {currentProposal ?
                    <>
                        <DishProposalItem proposal={previousProposal} isTransparent={true} />
                        <div className={styles['dish-proposal-current']}>
                            <DishProposalItem proposal={currentProposal} isTransparent={false} />
                            <div className={styles['dish-proposal-select-button-container']}>
                                <Button label="Wybierz" icon="details" onClick={onChoose} />
                                <p style={{ marginTop: '1rem' }}>{currentProposalNumber} z {proposals.length} rekomendacji</p>
                            </div>
                        </div>
                        <DishProposalItem proposal={nextProposal} isTransparent={true} />
                    </> :
                    <DishProposalItem proposal={currentProposal} isTransparent={false} />
                }
            </div>
            {currentProposal && <DishProposalNavigator onPrevious={onPrevious} onNext={onNext} />}
        </div>
    );
}
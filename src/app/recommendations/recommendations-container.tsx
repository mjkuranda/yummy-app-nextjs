'use client';

import styles from '@/styles/app/recommendations/page.module.scss';
import { RecommendationsNavigator } from '@/src/app/recommendations/recommendations-navigator';
import { RecommendationsItem } from '@/src/app/recommendations/recommendations-item';
import { useDishProposals } from '@/src/hooks/use-dish-proposals';
import { DishProposal } from '@/src/types/api.types';
import { Loader } from '@/src/components/common/loader';
import { Button } from '@/src/components/common/button';
import { BackLinkBar } from '@/src/components/common/back-link-bar';

export function RecommendationsContainer() {
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
        <div className={styles['recommendations-container']}>
            <div style={{ flex: 1, margin: '.5% .5% 0 .5%' }}>
                <BackLinkBar link="/" label={'Powrót do strony głównej'} />
            </div>
            <div className={styles['recommendations-nearby']}>
                {currentProposal ?
                    <>
                        <RecommendationsItem proposal={previousProposal} isTransparent={true} />
                        <div className={styles['recommendations-current']}>
                            <RecommendationsItem proposal={currentProposal} isTransparent={false} />
                            <div className={styles['recommendations-select-button-container']}>
                                <Button label="Wybierz" icon="details" onClick={onChoose} />
                                <p style={{ marginTop: '1rem' }}>{currentProposalNumber} z {proposals.length} rekomendacji</p>
                            </div>
                        </div>
                        <RecommendationsItem proposal={nextProposal} isTransparent={true} />
                    </> :
                    <RecommendationsItem proposal={currentProposal} isTransparent={false} />
                }
            </div>
            {currentProposal && <RecommendationsNavigator onPrevious={onPrevious} onNext={onNext} />}
        </div>
    );
}
import styles from '@/styles/app/recommendations/page.module.scss';
import { DishProposal } from '@/src/types/api.types';
import { DishImage } from '@/src/app/result/[id]/dish-image';

interface DishProposalItemProps {
    proposal: DishProposal;
    isTransparent: boolean;
}

export function RecommendationsItem({ proposal, isTransparent }: DishProposalItemProps) {
    if (!proposal) {
        return <div className={styles['recommendations-error']}>Niestety, brak propozycji dań dla Ciebie.</div>;
    }

    return (
        <div className={styles['recommendations-container__proposal']} style={{ opacity: isTransparent ? 0.382 : 1 }}>
            <div className={styles['recommendations-container__proposal-image']}>
                <div className={styles['recommendations-container__proposal-image-container']}>
                    <DishImage title={proposal.title} imgUrl={proposal.imgUrl} provider={proposal.provider} />
                </div>
            </div>
            <h3 className={styles['recommendations-container__proposal-header']}>
                {proposal.title}
            </h3>
        </div>
    );
}
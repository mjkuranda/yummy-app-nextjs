import styles from '@/styles/app/meal-proposal/page.module.scss';
import { MealProposal } from '@/src/types/api.types';
import { MealImage } from '@/src/app/result/[id]/meal-image';

interface MealProposalItemProps {
    proposal: MealProposal;
}

export function MealProposalItem({ proposal }: MealProposalItemProps) {
    if (!proposal) {
        return <div className={styles['meal-proposal-error']}>Unfortunately, no meal proposal for you.</div>;
    }

    return (
        <div className={styles['meal-proposal-container__proposal']}>
            <div className={styles['meal-proposal-container__proposal-image']}>
                <MealImage title={proposal.title} imgUrl={proposal.imgUrl} />
            </div>
            <h3 className={styles['meal-proposal-container__proposal-header']}>
                {proposal.title}
            </h3>
        </div>
    );
}
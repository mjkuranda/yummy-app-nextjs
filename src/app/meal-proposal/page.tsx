'use client';

import styles from '@/styles/app/meal-proposal/page.module.scss';
import { MealProposalContainer } from '@/src/app/meal-proposal/meal-proposal-container';
import { useUserContext } from '@/src/contexts/user.context';
import { useRouter } from 'next/navigation';
import { toastInfo } from '@/src/utils/toast.utils';

export default function MealProposal() {
    const { isLoggedIn } = useUserContext();
    const router = useRouter();

    if (!isLoggedIn()) {
        toastInfo('You need to log in first.');
        router.push('/');
    }

    return (
        <div className={styles['meal-proposal-page']}>
            <MealProposalContainer />
        </div>
    );
}
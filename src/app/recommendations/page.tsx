'use client';

import styles from '@/styles/app/recommendations/page.module.scss';
import { RecommendationsContainer } from '@/src/app/recommendations/recommendations-container';

export default function RecommendationsPage() {
    return (
        <div className={styles['recommendations-page']}>
            <RecommendationsContainer />
        </div>
    );
}
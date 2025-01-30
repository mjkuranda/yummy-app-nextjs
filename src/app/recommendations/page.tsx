'use client';

import { RecommendationsContainer } from '@/src/app/recommendations/recommendations-container';
import { ScreenContentLayout } from '@/src/components/common/layouts/screen-content-layout';

export default function RecommendationsPage() {
    return (
        <ScreenContentLayout>
            <RecommendationsContainer />
        </ScreenContentLayout>
    );
}
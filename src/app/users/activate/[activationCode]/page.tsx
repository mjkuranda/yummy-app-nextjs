import { WrappedScreenContentLayout } from '@/src/components/common/layouts/wrapped-screen-content-layout';
import { ActivationContainer } from '@/src/app/users/activate/[activationCode]/activation-container';

export default function ActivationPage() {
    return (
        <WrappedScreenContentLayout>
            <ActivationContainer />
        </WrappedScreenContentLayout>
    );
}
import { WrappedScreenContentLayout } from '@/src/components/common/layouts/wrapped-screen-content-layout';
import { RegistrationContainer } from '@/src/app/users/registration/registration-container';

export default function ChangePasswordPage() {
    return (
        <WrappedScreenContentLayout>
            <RegistrationContainer isResetting={true} />
        </WrappedScreenContentLayout>
    );
}
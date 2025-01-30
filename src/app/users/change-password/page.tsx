import { RegistrationForm } from '@/src/app/users/registration/registration-form';
import { WrappedScreenContentLayout } from '@/src/components/common/layouts/wrapped-screen-content-layout';

export default function ChangePasswordPage() {
    return (
        <WrappedScreenContentLayout>
            <RegistrationForm isResetting={true} />
        </WrappedScreenContentLayout>
    );
}
import { RegistrationForm } from '@/src/app/users/registration/registration-form';
import { BackLinkBar } from '@/src/components/common/back-link-bar';
import { WrappedScreenContentLayout } from '@/src/components/common/layouts/wrapped-screen-content-layout';

export default function RegistrationPage() {
    return (
        <WrappedScreenContentLayout>
            <div>
                <div style={{ margin: '.5rem' }}>
                    <BackLinkBar link="/users/login" label={'Powrót do logowania'} />
                </div>
                <RegistrationForm />
            </div>
        </WrappedScreenContentLayout>
    );
}
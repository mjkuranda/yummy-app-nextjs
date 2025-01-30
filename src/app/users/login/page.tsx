import { WrappedScreenContentLayout } from '@/src/components/common/layouts/wrapped-screen-content-layout';
import { LoginForm } from '@/src/app/users/login/login-form';

export default function LoginPage() {
    return (
        <WrappedScreenContentLayout>
            <LoginForm />
        </WrappedScreenContentLayout>
    );
}
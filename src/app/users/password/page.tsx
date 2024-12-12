'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { ResetPasswordPage } from '@/src/app/users/password/reset-password-page';

export default function Password() {
    const searchParams = useSearchParams();


    if (searchParams.get('reset')) {
        return <ResetPasswordPage />;
    }

    // TODO: if session, then change password page

    // Otherwise:
    redirect('/');
}
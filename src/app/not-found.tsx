import { WrappedScreenContentLayout } from '@/src/components/common/layouts/wrapped-screen-content-layout';
import Link from 'next/link';

export default function NotFound() {
    return (
        <WrappedScreenContentLayout>
            This page does not exist. Go to&nbsp;<Link href="/">main</Link>&nbsp;page.
        </WrappedScreenContentLayout>
    );
}
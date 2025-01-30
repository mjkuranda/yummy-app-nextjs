import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';
import { ObjectContainer } from '@/src/app/manage/[objects]/[action]/object-container';

export default function ObjectManagementPage() {
    return (
        <WrappedContentLayout>
            <ObjectContainer />
        </WrappedContentLayout>
    );
}
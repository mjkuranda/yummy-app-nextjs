import { WrappedContentLayout } from '@/src/components/common/layouts/wrapped-content-layout';
import { UserProfileContainer } from '@/src/app/users/[login]/profile/user-profile-container';

export default function UserLoginProfilePage() {
    return (
        <WrappedContentLayout>
            <UserProfileContainer />
        </WrappedContentLayout>
    );
}
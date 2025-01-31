import { UserProfile } from '@/src/types/api.types';
import { Loader } from '@/src/components/common/loader';
import styles from '@/styles/app/users/[login]/profile/user-profile-page.module.scss';

interface UserProfileTileProps {
    isLoading: boolean;
    profile: UserProfile;
}

export function UserProfileTile({ isLoading, profile }: UserProfileTileProps) {
    return (
        <div className={styles['user-profile-tile']}>
            {isLoading && <Loader isAbsolute={true} />}
            <div className={styles['user-profile__image-container']}></div>
            <div className={styles['user-profile__content-layout']}>
                <div className={styles['user-profile__info-container']}>
                    <h3 className="text-center mb-5">{profile.login}</h3>
                    <p><strong>Aktywowany</strong>: {new Date(profile.activated).toLocaleDateString()}</p>
                    <p><strong>Autor dań w liczbie</strong>: {profile.dishList.length || 0}</p>
                </div>
                <div className={styles['user-profile__content-layout-bottom']}></div>
            </div>
        </div>
    );
}
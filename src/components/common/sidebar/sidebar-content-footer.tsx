'use client';

import styles from '@/styles/components/common/header/sidebar.module.scss';
import { useUser } from '@/src/hooks/use-user';
import { Loader } from '@/src/components/common/loader';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { SidebarContentListElement } from '@/src/components/common/sidebar/sidebar-content-list-element';

export function SidebarContentFooter() {
    const { isLoggedIn, isFetching, onLogout } = useUser();

    return (
        <>
            <hr />
            <div className={styles['sidebar-content__header']}>
                {isFetching ? <Loader /> : (
                    isLoggedIn()
                        ? <SidebarContentListElement Icon={LogoutIcon} label={'Wyloguj'} link={''} onClick={onLogout} />
                        : <SidebarContentListElement Icon={LoginIcon} label={'Zaloguj'} link={'/users/login'} />
                )}
            </div>
        </>
    );
}
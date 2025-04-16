'use client';

import styles from '@/styles/components/common/header/sidebar.module.scss';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { useSidebarActions } from '@/src/contexts/sidebar.context';
import { useUser } from '@/src/hooks/use-user';
import { Loader } from '@/src/components/common/loader';
import { SidebarContentListElement } from '@/src/components/common/sidebar/sidebar-content-list-element';
import { CSSProperties } from 'react';

export function SidebarContentHeader() {
    const { isFetching, isLoggedIn, user } = useUser();
    const { onClose } = useSidebarActions();

    const style: CSSProperties = {
        fontWeight: 'bold',
        fontSize: '1.618em'
    };

    return (
        <>
            <div className={styles['sidebar-content__header']}>
                <div>
                    {isFetching
                        ? <Loader />
                        : isLoggedIn()
                            ? <SidebarContentListElement style={style} Icon={PersonIcon} label={user.login} link={`/users/${user.login}/profile`} />
                            : <SidebarContentListElement style={style} Icon={PersonIcon} label={'Gość'} link={''} />
                    }
                </div>
                <div onClick={onClose}>
                    <CloseIcon />
                </div>
            </div>
            <hr />
        </>
    );
}
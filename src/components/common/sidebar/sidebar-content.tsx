import styles from '@/styles/components/common/header/sidebar.module.scss';
import { useSidebarState } from '@/src/contexts/sidebar.context';
import { SidebarContentFooter } from '@/src/components/common/sidebar/sidebar-content-footer';
import { SidebarContentHeader } from '@/src/components/common/sidebar/sidebar-content-header';
import { SidebarContentListElement } from '@/src/components/common/sidebar/sidebar-content-list-element';
import { useHeaderLinks } from '@/src/hooks/use-header-links';

export function SidebarContent() {
    const isOpen = useSidebarState();
    const links = useHeaderLinks();

    return (
        <div className={styles['sidebar-content']} data-is-open={isOpen}>
            <div className={styles['sidebar-content__container']}>
                <div>
                    <SidebarContentHeader />
                    <ul className={styles['link-list']}>
                        {links.map(element => (
                            <SidebarContentListElement key={element.link} {...element} />
                        ))}
                    </ul>
                </div>
                <div>
                    <SidebarContentFooter />
                </div>
            </div>
        </div>
    );
}
import styles from '@/styles/components/common/header/sidebar.module.scss';
import { useSidebarState } from '@/src/contexts/sidebar.context';

export function SidebarOverlay() {
    const isOpen = useSidebarState();

    if (!isOpen) {
        return (<></>);
    }

    return (
        <div className={styles['sidebar-overlay']}></div>
    );
}
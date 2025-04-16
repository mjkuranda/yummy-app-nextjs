import styles from '@/styles/components/common/header/sidebar.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useSidebarActions, useSidebarState } from '@/src/contexts/sidebar.context';

interface LinkData {
    link: string;
    label: string;
}

const data: LinkData[] = [
    { link: '/', label: 'Strona główna' },
    { link: '/#description', label: 'O stronie' }
];

export function SidebarContent() {
    const isOpen = useSidebarState();
    const { onClose } = useSidebarActions();

    return (
        <div className={styles['sidebar-content']} data-is-open={isOpen}>
            <div className="d-flex justify-content-between">
                <div>Menu</div>
                <div onClick={onClose}>
                    <CloseIcon />
                </div>
            </div>
            <ul className={styles['link-list']}>
                {data.map(element => (
                    <li key={element.link}>
                        <a href={element.link} onClick={onClose}>{element.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
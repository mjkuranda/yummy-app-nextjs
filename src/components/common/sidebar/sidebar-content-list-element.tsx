import styles from '@/styles/components/common/header/sidebar.module.scss';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { useSidebarActions } from '@/src/contexts/sidebar.context';
import Link from 'next/link';
import { CSSProperties } from 'react';

interface SidebarContentListElementProps {
    Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
    label: string;
    link: string;
    onClick?: () => void;
    style?: CSSProperties;
}

export function SidebarContentListElement({ Icon, label, link, onClick, style }: SidebarContentListElementProps) {
    const { onClose } = useSidebarActions();

    return (
        <li className={styles['sidebar-content-list-element']} onClick={onClick} style={style}>
            <Link href={link} onClick={onClose}>
                <Icon />
                <p className={styles['sidebar-content-list-element__label']}>{label}</p>
            </Link>
        </li>
    );
}
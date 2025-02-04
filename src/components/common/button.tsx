'use client';

import Link from 'next/link';
import styles from '@/styles/components/common/button.module.scss';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import ClearIcon from '@mui/icons-material/Clear';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VisibilityIcon from '@mui/icons-material/Visibility';

type IconVariant = 'log in' | 'log out' | 'manage' | 'search' | 'best search' | 'clear' | 'next' | 'previous' | 'details';

interface ButtonProps {
    label: string;
    disabled?: boolean;
    icon?: IconVariant;
    link?: string;
    type?: 'button' | 'submit'
    width?: number;
    onClick?: (e: any) => void;
}

export function Button({ disabled, label, link, icon, type, width, onClick }: ButtonProps) {
    const className = disabled ? `${styles['button']} ${styles['button--disabled']}` : styles['button'];

    if (link) {
        return (
            <Link
                href={disabled ? '/' : link}
                className={className}
                aria-disabled={disabled}
                style={{ width: `${width}px`, display: 'flex' }}
                tabIndex={disabled ? -1 : undefined}>
                {icon && renderIcon(icon)}
                {icon && '\u00A0'}
                {label}
            </Link>
        );
    }

    return (
        <button type={type ?? 'button'} onClick={onClick ?? (() => {})} disabled={disabled} className={className} style={{ width }}>
            {icon && renderIcon(icon)}
            {icon && '\u00A0'}
            {label}
        </button>
    );
}

function renderIcon(icon: IconVariant) {
    const style = { marginLeft: '0.2rem' };

    switch (icon) {
    case 'log in': return <LoginIcon style={style} />;
    case 'log out': return <LogoutIcon style={style} />;
    case 'manage': return <ManageAccountsIcon style={style} />;
    case 'search': return <SearchIcon style={style} />;
    case 'best search': return <SavedSearchIcon style={style} />;
    case 'clear': return <ClearIcon style={style} />;
    case 'previous': return <SkipPreviousIcon style={style} />;
    case 'next': return <SkipNextIcon style={style} />;
    case 'details': return <VisibilityIcon style={style} />;
    }
}
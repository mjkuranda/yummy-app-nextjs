'use client';

import Link from 'next/link';
import styles from '@/styles/components/common/button.module.scss';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import ClearIcon from '@mui/icons-material/Clear';

type IconVariant = 'log in' | 'log out' | 'manage' | 'search' | 'best search' | 'clear';

interface ButtonProps {
    label: string;
    disabled?: boolean;
    icon?: IconVariant;
    link?: string;
    type?: 'button' | 'submit'
    onClick?: (e: any) => void;
}

export function Button({ disabled, label, link, icon, type, onClick }: ButtonProps) {
    const className = disabled ? `${styles['button']} ${styles['button--disabled']}` : styles['button'];

    if (link) {
        return (
            <Link
                href={disabled ? '/' : link}
                className={className}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : undefined}>
                {label}
                {icon && renderIcon(icon)}
            </Link>
        );
    }

    return (
        <button type={type ?? 'button'} onClick={onClick ?? (() => {})} disabled={disabled} className={className}>
            {label}
            {icon && renderIcon(icon)}
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
    }
}
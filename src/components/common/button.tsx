'use client';

import Link from 'next/link';
import styles from '@/styles/components/common/button.module.scss';

interface ButtonProps {
    disabled?: boolean;
    label: string;
    link?: string;
    type?: 'button' | 'submit'
    onClick?: (e: any) => void;
}

export function Button({ disabled, label, link, type, onClick }: ButtonProps) {
    const className = disabled ? `${styles['button']} ${styles['button--disabled']}` : styles['button'];

    if (link) {
        return (
            <Link
                href={disabled ? '/' : link}
                className={className}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : undefined}>
                {label}
            </Link>
        );
    }

    return (
        <button type={type ?? 'button'} onClick={onClick ?? (() => {})} disabled={disabled} className={className}>
            {label}
        </button>
    );
}
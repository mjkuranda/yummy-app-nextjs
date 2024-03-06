'use client';

import Link from 'next/link';
import styles from '@/styles/components/common/button.module.scss';

interface ButtonProps {
    label: string;
    link?: string;
    type?: 'button' | 'submit'
    onClick?: (e: any) => void;
}

export function Button({ label, link, type, onClick }: ButtonProps) {
    if (link) {
        return <Link href={link} className={styles['button']}>{label}</Link>;
    }

    return (
        <button type={type ?? 'button'} onClick={onClick ?? (() => {})} className={styles['button']}>
            {label}
        </button>
    );
}
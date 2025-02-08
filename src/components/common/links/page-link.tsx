import styles from '@/styles/components/common/links/page-link.module.scss';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { PagePathname } from '@/src/constants/strings';

export interface PageLinkProps {
    label: string;
    href: PagePathname;
    shouldOpenNewTab?: boolean;
    style?: CSSProperties;
}

export function PageLink({ href, label, shouldOpenNewTab, style }: PageLinkProps) {
    const newTabOptions = {
        target: '_blank',
        rel: 'noopener noreferrer'
    };

    return (
        <Link href={href} className={styles['page-link']} style={style} {...shouldOpenNewTab ? { ...newTabOptions } : { ...{} }}>
            {label}
        </Link>
    );
}
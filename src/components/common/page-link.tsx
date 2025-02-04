import styles from '@/styles/components/common/page-link.module.scss';
import { PagePathname } from '@/src/constants/strings';
import Link from 'next/link';

interface PageLinkProps {
    label: string;
    href: PagePathname;
}

export function PageLink({ href, label }: PageLinkProps) {
    return <Link href={href} className={styles['page-link']}>{label}</Link>;
}
import Link from 'next/link';
import styles from '@/styles/components/common/back-link.module.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { PagePathname } from '@/src/constants/strings';

interface BackLinkProps {
    link: PagePathname;
    label: string;
    isAttached?: boolean;
}

export function BackLink({ link, label, isAttached }: BackLinkProps) {
    return (
        <div className={styles[isAttached ? 'attached-back-link' : 'back-line']}>
            <Link href={link}>
                <ArrowCircleLeftIcon />{label}
            </Link>
        </div>
    );
}
import Link from 'next/link';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import styles from '@/styles/components/common/back-link.module.scss';

interface BackLinkProps {
    link: string; // TODO: various pages links
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
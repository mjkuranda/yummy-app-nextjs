import Link from 'next/link';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import styles from '@/styles/components/common/back-link.module.scss';

interface BackLinkBarProps {
    link: string; // TODO: various pages links
    label: string;
}

export function BackLinkBar({ link, label }: BackLinkBarProps) {
    return (
        <div className={styles['back-link-bar']}>
            <Link href={link}>
                <ArrowCircleLeftIcon />{label}
            </Link>
        </div>
    );
}
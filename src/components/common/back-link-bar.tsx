import Link from 'next/link';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import styles from '@/styles/components/common/back-link.module.scss';

interface BackLinkBarProps {
    link: string; // TODO: various pages links
    label: string;
    onlyMarginBottom?: boolean;
}

export function BackLinkBar({ link, label, onlyMarginBottom }: BackLinkBarProps) {
    return (
        <div className={styles['back-link-bar']} data-only-margin-bottom={onlyMarginBottom}>
            <Link href={link}>
                <ArrowCircleLeftIcon />{label}
            </Link>
        </div>
    );
}
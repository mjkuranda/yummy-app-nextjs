import Link from 'next/link';
import styles from '@/styles/components/common/back-link.module.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { PagePathname } from '@/src/constants/strings';

interface BackLinkBarProps {
    link: PagePathname;
    label: string;
    hasMarginAround?: boolean;
    onlyMarginBottom?: boolean;
}

export function BackLinkBar({ link, label, hasMarginAround, onlyMarginBottom }: BackLinkBarProps) {
    return (
        <div className={styles['back-link-bar']} data-has-margin-around={hasMarginAround} data-only-margin-bottom={onlyMarginBottom}>
            <Link href={link}>
                <ArrowCircleLeftIcon />{label}
            </Link>
        </div>
    );
}
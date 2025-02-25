import styles from '@/styles/components/common/progress-bar.module.scss';

interface ProgressBarProps {
    value: number;
    maxValue: number;
}

export function ProgressBar({ value, maxValue }: ProgressBarProps) {
    return (
        <progress className={styles['progress-bar']} value={value} max={maxValue} />
    );
}
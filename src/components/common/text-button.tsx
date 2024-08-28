import styles from '@/styles/components/common/add-button.module.scss';

interface TextButtonProps {
    label: string;
    onClick: (e: any) => void;
}

export function TextButton({ label, onClick }: TextButtonProps) {
    return (
        <div className={styles['add-button']} onClick={onClick} data-underline={true}>{label}</div>
    );
}
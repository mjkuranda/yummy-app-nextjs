import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styles from '@/styles/components/common/add-button.module.scss';

interface RemoveButtonProps {
    label: string;
    onClick: (e: any) => void;
}

export function RemoveButton({ label, onClick }: RemoveButtonProps) {
    return (
        <div className={styles['add-button']} onClick={onClick}>
            <RemoveCircleIcon />
            <div className={styles['label-container']}>
                {label}
            </div>
        </div>
    );
}
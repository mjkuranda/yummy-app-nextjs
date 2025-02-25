import AddCircleIcon from '@mui/icons-material/AddCircle';
import styles from '@/styles/components/common/buttons/add-button.module.scss';

interface AddButtonProps {
    label: string;
    onClick: (e: any) => void;
}

export function AddButton({ label, onClick }: AddButtonProps) {
    return (
        <div className={styles['add-button']} onClick={onClick}>
            <AddCircleIcon />
            <div className={styles['label-container']}>
                {label}
            </div>
        </div>
    );
}
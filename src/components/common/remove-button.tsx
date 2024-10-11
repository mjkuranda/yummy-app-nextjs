import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styles from '@/styles/components/common/add-button.module.scss';

interface RemoveButtonProps {
    label: string;
    onClick: (e: any) => void;
    customStyle?: Record<any, any>;
}

export function RemoveButton({ label, onClick, customStyle }: RemoveButtonProps) {
    return (
        <div className={styles['add-button']} onClick={onClick} style={customStyle ?? {}}>
            <RemoveCircleIcon />
            <div className={styles['label-container']}>
                {label}
            </div>
        </div>
    );
}
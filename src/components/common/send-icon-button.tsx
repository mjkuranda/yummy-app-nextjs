import styles from '@/styles/components/common/add-button.module.scss';
import SendIcon from '@mui/icons-material/Send';

interface SendIconButtonProps {
    disabled: boolean;
    onClick: (e: any) => void;
}

export function SendIconButton({ disabled, onClick }: SendIconButtonProps) {
    return (
        <div className={styles['add-button']} onClick={onClick} data-disabled={disabled}>
            <SendIcon />
        </div>
    );
}
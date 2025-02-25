import DeleteIcon from '@mui/icons-material/Delete';
import styles from '@/styles/components/common/buttons/add-button.module.scss';

interface DeleteLinkProps {
    label: string;
    onClick: () => void;
}

export function DeleteLink({ label, onClick }: DeleteLinkProps) {
    return (
        <div className={styles['add-button']} onClick={onClick}>
            <DeleteIcon />{label}
        </div>
    );
}
import styles from '@/styles/components/common/checkbox.module.scss';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import LinkIcon from '@mui/icons-material/Link';
import FileUploadIcon from '@mui/icons-material/FileUpload';

type IconVariant = 'none' | 'link' | 'upload';

interface CheckboxProps {
    checked: boolean;
    icon?: IconVariant;
    size: number | string;
    onClick: (e: any) => void;
}

export function Checkbox({ checked, icon, size, onClick }: CheckboxProps) {
    return (
        <div onClick={onClick} style={{ width: size, height: size }} className={styles['checkbox']} data-checked={checked}>
            {icon && renderIcon(icon)}
        </div>
    );
}

function renderIcon(icon: IconVariant) {
    const style = { width: '61%' };

    switch (icon) {
    case 'none': return <NoPhotographyIcon style={style} />;
    case 'link': return <LinkIcon style={style} />;
    case 'upload': return <FileUploadIcon style={style} />;
    }
}
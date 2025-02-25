'use client';

import EditIcon from '@mui/icons-material/Edit';
import styles from '@/styles/components/common/buttons/add-button.module.scss';
import { useRouter } from 'next/navigation';
import { PagePathname } from '@/src/constants/strings';

interface EditLinkProps {
    link: PagePathname;
    label: string;
}

export function EditLink({ label, link }: EditLinkProps) {
    const router = useRouter();

    const onClick = () => router.push(link);

    return (
        <div className={styles['add-button']} onClick={onClick}>
            <EditIcon />{label}
        </div>
    );
}

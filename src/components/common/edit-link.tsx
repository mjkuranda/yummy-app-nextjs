import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

interface EditLinkProps {
    link: string; // TODO: various pages links
    label: string;
}

export function EditLink({ label, link }: EditLinkProps) {
    return (
        <div>
            <Link href={link}>
                <EditIcon />{label}
            </Link>
        </div>
    );
}

import MenuIcon from '@mui/icons-material/Menu';
import { useSidebarActions } from '@/src/contexts/sidebar.context';

export function SidebarOpener() {
    const { onToggle } = useSidebarActions();

    return (
        <div className="d-flex justify-content-center align-items-center display-5" onClick={onToggle}>
            <MenuIcon />
        </div>
    );
}
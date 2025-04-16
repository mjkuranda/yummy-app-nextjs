import { useState, MouseEvent, useCallback } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useHeaderLinks } from '@/src/hooks/use-header-links';
import { useUser } from '@/src/hooks/use-user';
import { useRouter } from 'next/navigation';

export default function AccountDropdown() {
    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const links = useHeaderLinks();
    const { user, onLogout } = useUser();

    const onClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const onClose = useCallback((url?: string) => {
        setAnchorEl(null);

        if (url) {
            router.push(url);
        }
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Opcje">
                    <IconButton
                        onClick={onClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>{user.login.substring(0, 1).toUpperCase()}</Avatar>
                    </IconButton>
                </Tooltip>
                <Typography>{user.login}</Typography>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={() => onClose()}
                onClick={() => onClose()}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => onClose(`/users/${user.login}/profile`)}>
                    <Avatar /> Moje konto
                </MenuItem>
                <Divider />
                {links.filter(element => element.includesDropdown).map(element => (
                    <MenuItem onClick={() => onClose(element.link)}>
                        <ListItemIcon>
                            <element.Icon />
                        </ListItemIcon>
                        {element.label}
                    </MenuItem>
                ))}
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Wyloguj
                </MenuItem>
            </Menu>
        </>
    );
}
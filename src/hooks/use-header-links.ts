'use client';

import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import WorkIcon from '@mui/icons-material/Work';
import { useUser } from '@/src/hooks/use-user';
import { useMemo } from 'react';

interface LinkData {
    link: string;
    label: string;
    Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
}

export function useHeaderLinks() {
    const { user, hasCapability, isLoggedIn } = useUser();

    const data: LinkData[] = useMemo(() => [
        { link: '/', label: 'Strona główna', Icon: HomeIcon },
        { link: '/search', label: 'Wyszukaj dania', Icon: SearchIcon },
        ...(isLoggedIn()
            ? [
                { link: '/recommendations', label: 'Propozycje dań', Icon: ListIcon },
                { link: '/dishes/create', label: 'Stwórz nowe danie', Icon: AddIcon },
                { link: '/users/change-password', label: 'Zmiana hasła', Icon: VpnKeyIcon }
            ]
            : []
        ),
        ...(hasCapability()
            ? [{ link: '/manage', label: 'Zarządzaj', Icon: WorkIcon }]
            : []
        ),
        { link: '/#description', label: 'O stronie', Icon: InfoIcon }
    ], [user.login]);

    return data;
}
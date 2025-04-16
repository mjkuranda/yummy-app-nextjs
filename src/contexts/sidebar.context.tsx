import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface SidebarContextProps {
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}

const SidebarStateContext = createContext<boolean | undefined>(undefined);
const SidebarActionsContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const onToggle = () => setIsOpen(!isOpen);

    const actions: SidebarContextProps = useMemo(() => ({ onOpen, onClose, onToggle }), []);

    return (
        <SidebarStateContext.Provider value={isOpen}>
            <SidebarActionsContext.Provider value={actions}>
                {children}
            </SidebarActionsContext.Provider>
        </SidebarStateContext.Provider>
    );
};

export const useSidebarState = () => {
    const context = useContext(SidebarStateContext);
    if (context === undefined) throw new Error('useSidebarState must be used within SidebarProvider');

    return context;
};

export const useSidebarActions = () => {
    const context = useContext(SidebarActionsContext);
    if (context === undefined) throw new Error('useSidebarActions must be used within SidebarProvider');

    return context;
};

'use client';

import { SidebarContent } from '@/src/components/common/sidebar/sidebar-content';
import { SidebarProvider } from '@/src/contexts/sidebar.context';
import { SidebarOpener } from '@/src/components/common/sidebar/sidebar-opener';
import { SidebarOverlay } from '@/src/components/common/sidebar/sidebar-overlay';

export default function Sidebar() {
    return (
        <SidebarProvider>
            <SidebarOpener />
            <SidebarOverlay />
            <SidebarContent />
        </SidebarProvider>
    );
}
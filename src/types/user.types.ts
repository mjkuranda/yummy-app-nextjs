import { UserPermissions } from '@/src/types/api.types';

export interface CurrentUser extends UserPermissions {
    login: string;
}
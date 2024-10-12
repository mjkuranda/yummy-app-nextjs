'use client';

import styles from '@/styles/app/manage/page.module.scss';
import { Button } from '@/src/components/common/button';
import { ActionType } from '@/src/types/manage.types';
import { ObjectItemStruct } from '@/src/hooks/use-object-management';

interface ObjectItemProps {
    object: ObjectItemStruct;
    actionType: ActionType;
    onClick: (action: () => Promise<any>) => Promise<void>;
}

export function ObjectItem({ object, actionType, onClick }: ObjectItemProps) {
    const actionLabel = getActionLabel(actionType);

    return (
        <tr key={object.id}>
            <td className={styles['object-table__label']}>{object.label}</td>
            <td className={styles['object-table__action']}>
                <Button label={actionLabel} onClick={() => onClick(object.action)} />
            </td>
        </tr>
    );
}

function getActionLabel(actionType: ActionType): string {
    let action = 'Wykonaj';

    switch (actionType) {
    case 'added':
        action = 'Dodaj';
        break;
    case 'edited':
        action = 'Edytuj';
        break;
    case 'deleted':
        action = 'Usuń';
        break;
    case 'not-activated':
        action = 'Aktywuj';
        break;
    }

    return action;
}
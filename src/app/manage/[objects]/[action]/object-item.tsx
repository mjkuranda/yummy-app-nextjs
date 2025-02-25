'use client';

import styles from '@/styles/app/manage/page.module.scss';
import { Button } from '@/src/components/common/buttons/button';
import { ActionType } from '@/src/types/manage.types';
import { ObjectItemStruct } from '@/src/hooks/use-object-management';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

interface ObjectItemProps {
    object: ObjectItemStruct;
    actionType: ActionType;
    onClick: (action: (objectList: ObjectItemStruct[]) => Promise<void>) => Promise<void>;
}

export function ObjectItem({ object, actionType, onClick }: ObjectItemProps) {
    const actionLabel = object.actionLabel || getActionLabel(actionType);

    const onClickButton = async () => {
        if (confirm('Czy aby na pewno chcesz wykonać tą akcję?')) {
            await onClick(object.action);
        }
    };

    const renderLabelIcon = () => {
        switch (object.labelIcon) {
        case 'person-grand':
            return <PersonAddAlt1Icon style={{ color: 'green' }} />;
        case 'person-deny':
            return <PersonRemoveIcon style={{ color: 'red' }} />;
        default:
            return null;
        }
    };

    return (
        <tr key={object.id}>
            <td className={styles['object-table__label']}>{renderLabelIcon()}{object.label && ' '}{object.label}</td>
            <td className={styles['object-table__action']}>
                <Button label={actionLabel} onClick={onClickButton} disabled={object.actionDisabled} />
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
        action = 'Zatwierdź';
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
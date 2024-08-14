import { ObjectItem } from '@/src/hooks/use-object-management';
import styles from '@/styles/app/management/page.module.scss';
import { Button } from '@/src/components/common/button';
import { ActionType, ObjectType } from '@/src/types/management.types';

interface ObjectListProps {
    objects: ObjectItem[];
    objectType: ObjectType;
    actionType: ActionType;
}

export function ObjectList({ objects, objectType, actionType }: ObjectListProps) {
    return (
        <>
            <h3>{objectType === 'meals' ? 'Meal list' : 'User list'}</h3>
            <table className={styles['object-table']}>
                <thead>
                    <tr>
                        <th className={styles['object-table__label']}>Name</th>
                        <th className={styles['object-table__action']}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {objects.map(object => {
                        const actionLabel = getActionLabel(actionType);

                        return (
                            <tr key={object.id}>
                                <td className={styles['object-table__label']}>{object.label}</td>
                                <td className={styles['object-table__action']}>
                                    <Button label={actionLabel} onClick={object.action} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

function getActionLabel(actionType: ActionType): string {
    let action = 'Click';

    switch (actionType) {
    case 'added':
        action = 'Add';
        break;
    case 'edited':
        action = 'Edit';
        break;
    case 'deleted':
        action = 'Delete';
        break;
    case 'not-activated':
        action = 'Activate';
        break;
    }

    return action;
}
import { ObjectItem } from '@/src/hooks/use-object-management';
import styles from '@/styles/app/management/page.module.scss';
import { Button } from '@/src/components/common/button';

interface ObjectListProps {
    objects: ObjectItem[];
    objectType: string;
}

export function ObjectList({ objects, objectType }: ObjectListProps) {
    return (
        <>
            <h3>{objectType === 'meals' ? 'Meal list' : 'User list'}</h3>
            <table className={styles['object-table']}>
                <thead>
                    <tr>
                        <th className={styles['object-table__label']}>Label</th>
                        <th className={styles['object-table__action']}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {objects.map(object => {
                        return (
                            <tr>
                                <td className={styles['object-table__label']}>{object.label}</td>
                                <td className={styles['object-table__action']}>
                                    <Button label="Action" onClick={object.action} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

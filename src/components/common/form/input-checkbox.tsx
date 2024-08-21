import styles from '@/styles/components/common/inputs/input-checkbox.module.scss';
import { ChangeEventHandler } from 'react';

interface InputCheckboxProps {
    id: string;
    label: string;
    isChecked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export function InputCheckbox({ id, label, isChecked, onChange }: InputCheckboxProps) {
    return (
        <div className={styles['input-checkbox']}>
            <div className={styles['input-container']}>
                <input
                    type="checkbox"
                    id={id}
                    name={id}
                    data-id={id}
                    value={label}
                    onChange={onChange}
                    checked={isChecked}
                />
            </div>
            <div className={styles['label-container']}>
                <label htmlFor={id}>
                    {label}
                </label>
            </div>
        </div>
    );
}
import styles from '@/styles/components/common/inputs/input-range.module.scss';
import { ChangeEventHandler } from 'react';

interface InputRangeProps {
    id: string;
    name: string;
    label: string;
    settings: {
        min: number;
        max: number;
        value: number;
        step: number;
    };
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export function InputRange({ id, name, label, settings, onChange }: InputRangeProps) {
    const { min, max, value, step } = settings;

    return (
        <div className={styles['input-range']}>
            <label htmlFor={name}>{label}</label>
            <input type="range" id={id} name={name} min={min} max={max} value={value} step={step} onChange={onChange} />
        </div>
    );
}
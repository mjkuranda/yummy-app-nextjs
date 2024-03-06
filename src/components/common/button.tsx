'use client';

interface ButtonProps {
    label: string;
    type?: 'button' | 'submit'
    onClick?: (e: any) => void;
}

export function Button({ label, type, onClick }: ButtonProps) {
    return (
        <button type={type ?? 'button'} onClick={onClick ?? (() => {})}>
            {label}
        </button>
    );
}
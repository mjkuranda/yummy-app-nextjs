import { Button } from '@/src/components/common/buttons/button';
import { ChangeEvent, useRef } from 'react';
import styles from '@/styles/components/common/inputs/input-image.module.scss';
import { FieldError } from 'react-hook-form';
import { ErrorMessage } from '@/src/components/common/error-message';

interface InputImageProps {
    id: string;
    setImage: (file: File) => void;
    image?: File;
    width?: string;
    error?: FieldError;
    shouldShowResult?: boolean;
}

export function InputImage({ id, image, width = '100%', setImage, error, shouldShowResult = true }: InputImageProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const onUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={styles['input-image']}>
            {shouldShowResult && image && (
                <div className={styles['center-horizontally']}>
                    <img
                        className={styles['uploaded-image']}
                        src={typeof image?.name === 'string' ? URL.createObjectURL(image) : '/no-image.png'}
                        alt="Wybrany obraz"
                        style={{ width }}
                    />
                </div>
            )}
            <input
                className={styles['input-file']}
                accept="image/jpg, image/jpeg, image/png"
                onChange={onChange}
                ref={fileInputRef}
                type="file"
                id={id}
            />
            <ErrorMessage error={error} />
            <div className={styles['center-horizontally']}>
                <Button
                    label={'Dołącz'}
                    onClick={onUpload}
                />
            </div>
        </div>
    );
}
import { Button } from '@/src/components/common/button';
import { ChangeEvent, useRef } from 'react';
import styles from '@/styles/components/common/inputs/input-image.module.scss';

interface InputImageProps {
    id: string;
    width?: string;
    image?: File;
    setImage: (file: File) => void;
}

export function InputImage({ id, image, width = '100%', setImage }: InputImageProps) {
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
            {image && (
                <div className={styles['center-horizontally']}>
                    <img
                        className={styles['uploaded-image']}
                        src={URL.createObjectURL(image)}
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
            <div className={styles['center-horizontally']}>
                <Button
                    label={'Upload'}
                    onClick={onUpload}
                />
            </div>
        </div>

    );

}
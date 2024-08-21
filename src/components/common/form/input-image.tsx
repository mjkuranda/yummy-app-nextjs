import { Button } from '@/src/components/common/button';
import { ChangeEvent, useRef } from 'react';

interface InputImageProps {
    id: string;
    width?: string;
    image?: File;
    setImage: (file: File) => void;
}

export default function InputImage({ id, image, width = '100%', setImage }: InputImageProps) {
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

    const centerContainer = {
        display: 'flex',
        justifyContent: 'center'
    };

    const inputStyle = {
        display: 'none'
    };

    return (
        <div>
            {image && (
                <div style={centerContainer}>
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Wybrany obraz"
                        style={{ width, margin: '1rem 0' }} />
                </div>
            )}
            <input style={inputStyle}
                accept="image/jpg, image/jpeg, image/png"
                onChange={onChange}
                ref={fileInputRef}
                type="file"
                id={id}
            />
            <div style={centerContainer}>
                <Button
                    label={'Upload'}
                    onClick={onUpload}
                />
            </div>
        </div>

    );

}
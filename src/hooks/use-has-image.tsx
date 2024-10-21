import { useEffect, useState } from 'react';

interface useHasImageReturnType {
    hasImage: boolean;
    isLoading: boolean;
}

export function useHasImage(imgUrl?: string): useHasImageReturnType {
    const [hasImage, setHasImage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!imgUrl) {
            setIsLoading(false);
            setHasImage(false);

            return;
        }

        setIsLoading(true);

        checkImageUrl(imgUrl)
            .then(result => setHasImage(result))
            .catch(() => setHasImage(false))
            .finally(() => setIsLoading(false));
    }, [imgUrl]);

    return { hasImage, isLoading };
}

function checkImageUrl(urlString: string, timeout: number = 8000): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            const url = new URL(urlString);
            const img = new Image();

            const timer = setTimeout(() => {
                img.src = '';
                reject(false);
            }, timeout);

            img.onload = () => {
                clearTimeout(timer);
                resolve(true);
            };

            img.onerror = () => {
                clearTimeout(timer);
                reject(false);
            };

            img.src = url.toString();
        } catch (error) {
            reject(false);
        }
    });
}
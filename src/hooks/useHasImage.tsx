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

            return;
        }

        checkImageUrl(imgUrl)
            .then(result => setHasImage(result))
            .catch(() => setHasImage(false))
            .finally(() => setIsLoading(false));
    }, []);

    return { hasImage, isLoading };
}

function checkImageUrl(urlString: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            const url = new URL(urlString);
            const img = new Image();

            img.onload = () => resolve(true);
            img.onerror = () => reject(false);
            img.src = url.toString();
        } catch (error) {
            reject(false);
        }
    });
}
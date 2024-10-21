'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useScroll(): { onWheel: (event: WheelEvent) => void } {
    const [screen, setScreen] = useState<number>(0);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null); // Referencja do timeoutu

    useEffect(() => {
        window.scrollBy({
            top: -window.scrollY,
            behavior: 'smooth'
        });
    }, []);

    const onWheel = useCallback((event: WheelEvent) => {
        event.preventDefault();

        const multiplier = event.deltaY > 0 ? 1 : -1;

        if (screen <= 0 && multiplier === -1) {
            setScreen(0);

            return;
        }

        if (screen >= 4 && multiplier === 1) {
            setScreen(4);

            return;
        }

        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = setTimeout(() => {
            if (screen === 4 && multiplier === -1) {
                window.scrollBy({
                    top: -222.4,
                    behavior: 'smooth'
                });
            } else {
                window.scrollBy({
                    top: window.innerHeight * multiplier,
                    behavior: 'smooth'
                });
            }
            setScreen(prevScreen => Math.min(Math.max(prevScreen + multiplier, 0), 4));
        }, 0);

    }, [screen]);

    return { onWheel };
}
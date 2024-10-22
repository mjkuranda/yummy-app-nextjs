'use client';

import { useCallback, useEffect, useRef, useState, WheelEvent } from 'react';

export function useScroll(): {
    screen: number,
    onWheel: (event: WheelEvent<HTMLDivElement>) => void,
    onKeyDown: (event: KeyboardEvent) => void
    } {
    const [screen, setScreen] = useState<number>(0);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        window.scrollBy({
            top: -window.scrollY,
            behavior: 'smooth'
        });
    }, []);

    const changeScreen = useCallback((multiplier: -1 | 1): void => {
        setScreen(prevScreen => {
            const newScreen = Math.min(Math.max(prevScreen + multiplier, 0), 4);

            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            scrollTimeout.current = setTimeout(() => {
                if (newScreen === 3 && multiplier === -1) {
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
            }, 0);

            return newScreen;
        });
    }, []);

    const onWheel = useCallback((event: WheelEvent<HTMLDivElement>) => {
        event.preventDefault();

        changeScreen(event.deltaY > 0 ? 1 : -1);
    }, [changeScreen]);

    const onKeyDown = useCallback((event: KeyboardEvent): void => {
        event.preventDefault();

        if (event.key === 'ArrowDown') {
            changeScreen(1);

            return;
        }

        if (event.key === 'ArrowUp') {
            changeScreen(-1);

            return;
        }
    }, [changeScreen]);

    return { screen, onWheel, onKeyDown };
}

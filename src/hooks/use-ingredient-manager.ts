'use client';

import { IngredientDataLabels, IngredientManager } from '@/src/types/ingredient.types';
import { useEffect, useState } from 'react';

export function useIngredientManager(): IngredientManager {
    const [labels, setLabels] = useState<IngredientDataLabels[]>([]);

    const fetchLabels = async () => {
        const res = await fetch('/data/ingredients/ingredients.json');
        const json = await res.json();

        return Object
            .entries(json)
            .map(entry => entry[1]) as IngredientDataLabels[];
    };

    useEffect(() => {
        fetchLabels().then(data => setLabels(data));
    }, []);

    const filterIngredients = (match: string): IngredientDataLabels[] => {
        if (match.length === 0) {
            return [];
        }

        // It depends on the language, but let's say, it's Polish.
        return labels.filter(label => label.pl.startsWith(match));
    };

    return {
        labels,
        filterIngredients
    };
}
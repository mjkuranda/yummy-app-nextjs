'use client';

import {
    IngredientData,
    IngredientDataValue,
    IngredientManager
} from '@/src/types/ingredient.types';
import { useEffect, useState } from 'react';

export function useIngredientManager(): IngredientManager {
    const [labels, setLabels] = useState<IngredientDataValue[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);

    const fetchLabels = async () => {
        const res = await fetch('/data/ingredients/ingredients.json');
        const json = await res.json() as IngredientData;

        return Object
            .entries(json)
            .map(entry => entry[1]) as IngredientDataValue[];
    };

    useEffect(() => {
        fetchLabels()
            .then(data => setLabels(data))
            .finally(() => setIsFetching(false));
    }, []);

    const filterIngredients = (match: string): IngredientDataValue[] => {
        if (match.length === 0) {
            return [];
        }

        // It depends on the language, but let's say, it's Polish.
        return labels.filter(label => label.pl.startsWith(match));
    };

    return {
        isFetching,
        labels,
        filterIngredients
    };
}
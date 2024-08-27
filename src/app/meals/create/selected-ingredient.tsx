import { ListItem, ListItemText } from '@mui/material';
import { RemoveButton } from '@/src/components/common/remove-button';
import React from 'react';
import { Items } from '@/src/components/common/form/input-list';

interface SelectedIngredientProps {
    index: number;
    item: [string, string];
    selectedItems: Items;
    setSelectedItems: (items: Items) => void;
}

export function SelectedIngredient({ index, item, selectedItems, setSelectedItems }: SelectedIngredientProps) {
    const onRemoveIngredient = () => {
        const modifiedItems = { ...selectedItems };
        delete modifiedItems[item[0]];

        setSelectedItems(modifiedItems);
    };

    return (
        <ListItem key={index}>
            <ListItemText primary={item[1]} className="text-capitalize" />
            <RemoveButton label={'Remove'} onClick={onRemoveIngredient} />
        </ListItem>
    );
}
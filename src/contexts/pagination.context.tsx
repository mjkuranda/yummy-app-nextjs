'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface PaginationProviderProps {
    children: any;
    page: number;
    rowsPerPage: number;
    setPage: Dispatch<SetStateAction<number>>;
    setRowsPerPage: Dispatch<SetStateAction<number>>;
}

type PaginationContextValues = Omit<PaginationProviderProps, 'children'>;

const defaultValue: PaginationContextValues = {
    page: 1,
    rowsPerPage: 10,
    setPage: () => {},
    setRowsPerPage: () => {}
};

const PaginationContext = createContext<PaginationContextValues>(defaultValue);

export const usePaginationContext = () => useContext(PaginationContext);

export function PaginationProvider({ children }: { children: ReactNode }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const contextValue: PaginationContextValues = { page, rowsPerPage, setPage, setRowsPerPage };

    return (
        <PaginationContext.Provider value={contextValue}>
            {children}
        </PaginationContext.Provider>
    );
}
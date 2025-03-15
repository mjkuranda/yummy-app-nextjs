'use client';

import { styled } from '@mui/system';
import {
    TablePagination,
    tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { ChangeEvent, MouseEvent } from 'react';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { ObjectItemStruct } from '@/src/hooks/use-object-management';
import { usePaginationContext } from '@/src/contexts/pagination.context';

const blue = {
    50: '#F0F7FF',
    200: '#A5D8FF',
    400: '#3399FF',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

interface CustomTablePaginationProps {
    objects: ObjectItemStruct[];
}

export function CustomTablePagination({ objects }: CustomTablePaginationProps) {
    const { page, setPage, rowsPerPage, setRowsPerPage } = usePaginationContext();

    // Avoid a layout jump when reaching the last page with empty rows.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - objects.length) : 0;

    const handleChangePage = (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <StyledTablePagination
            rowsPerPageOptions={[10, 25, 50, 100, { label: 'All', value: -1 }]}
            colSpan={3}
            count={objects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            slotProps={{
                select: {
                    'aria-label': 'Liczba wierszy na stronę',
                },
                actions: {
                    showFirstButton: true,
                    showLastButton: true,
                    slots: {
                        firstPageIcon: FirstPageRoundedIcon,
                        lastPageIcon: LastPageRoundedIcon,
                        nextPageIcon: ChevronRightRoundedIcon,
                        backPageIcon: ChevronLeftRoundedIcon,
                    },
                    getItemAriaLabel: (type) => {
                        if (type === 'first') return 'Pierwsza strona';
                        if (type === 'last') return 'Ostatnia strona';
                        if (type === 'next') return 'Następna strona';
                        if (type === 'previous') return 'Poprzednia strona';

                        return '';
                    },
                },
            }}
            labelDisplayedRows={({ from, to, count }) => `Wyświetlane ${from}–${to} z ${count !== -1 ? count : 'więcej niż ' + to}`}
            labelRowsPerPage="Wierszy na stronę:"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}

const StyledTablePagination = styled(TablePagination)(
    ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
    margin-top: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    font-family: 'IBM Plex Sans', sans-serif;
    padding: 2px 0 2px 4px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 6px; 
    background-color: transparent;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 100ms ease;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    display: flex;
    gap: 6px;
    border: transparent;
    text-align: center;
  }

  & .${classes.actions} > button {
    display: flex;
    align-items: center;
    padding: 0;
    border: transparent;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 120ms ease;

    > svg {
      font-size: 22px;
    }

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }

    &:disabled {
      opacity: 0.3;
      &:hover {
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
        background-color: transparent;
      }
    }
  }
  `,
);
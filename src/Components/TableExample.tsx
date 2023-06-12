import React, { useMemo } from 'react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { Box } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';

type Person = {
    name: {
        firstName: string;
        lastName: string;
    };
    address: string;
    city: string;
    state: string;
};

const data: Person[] = [
    {
        name: {
            firstName: 'Zachary',
            lastName: 'Davis',
        },
        address: '261 Battle Ford',
        city: 'Columbus',
        state: 'Ohio',
    },
    {
        name: {
            firstName: 'Robert',
            lastName: 'Smith',
        },
        address: '566 Brakus Inlet',
        city: 'Westerville',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Yan',
        },
        address: '7777 Kuhic Knoll',
        city: 'South Linda',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'John',
            lastName: 'Upton',
        },
        address: '722 Emie Stream',
        city: 'Huntington',
        state: 'Washington',
    },
    {
        name: {
            firstName: 'Nathan',
            lastName: 'Harris',
        },
        address: '1 Kuhic Knoll',
        city: 'Ohiowa',
        state: 'Nebraska',
    },
];

const TableExample = () => {
    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'name.firstName', //access nested data with dot notation
                header: 'First Name',
            },
            {
                accessorKey: 'name.lastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'address', //normal accessorKey
                header: 'Address',
            },
            {
                accessorKey: 'city',
                header: 'City',
            },
            {
                accessorKey: 'state',
                header: 'State',
            },
        ],
        [],
    );

    return <MantineReactTable 
    columns={columns} 
    data={data} 
    enableRowActions 
    renderRowActions={({ row }) => (
        <Box>
            <ActionIcon onClick={() => console.info(row)}>
                <IconEdit />
            </ActionIcon> 
        </Box>
    )} />;
}

export default TableExample
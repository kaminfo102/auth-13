'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns-jalali';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: datetime?;
  nationalId: string;
  mobile: string;
  city: string;
  term: number;
  createdAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: 'row',
    header: 'ردیف',
    cell: (({ row }) => row.index + 1),
    enableSorting: false,
    size: 50
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        نام
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        نام خانوادگی
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
  },
{
    accessorKey: 'nationalId',
    header: 'کد ملی',
    size: 100
},
  {
    accessorKey: 'birthDate',
    header: 'تاریخ تولد',
    cell: ({ row }) => format(new Date(row.getValue('birthDate')), 'yyyy/MM/dd'),
    size: 100
  },
  // {
  //   accessorKey: 'email',
  //   header: 'ایمیل',
  //     size: 200
  // },
  {
    accessorKey: 'mobile',
    header: 'موبایل',
      size: 150
  },
  {
    accessorKey: 'city',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        شهرستان
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
      size: 150
  },
  {
    accessorKey: 'term',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        ترم
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
      size: 80
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        تاریخ ثبت نام
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => format(new Date(row.getValue('createdAt')), 'yyyy/MM/dd'),
      size: 150
  },
];

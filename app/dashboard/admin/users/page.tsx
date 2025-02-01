'use client';

import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user: any) =>
    Object.values(user).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">لیست فراگیران</h1>

      <div className="relative mb-4">
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجو..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />
      </div>

      {loading ? (
        <div>در حال بارگذاری...</div>
      ) : (
        <DataTable columns={columns} data={filteredUsers} />
      )}
    </div>
  );
}

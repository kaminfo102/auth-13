'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, School, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar } from '@/components/ui/chart';

type Stats = {
  totalStudents: number;
  cities: number;
  averageTerm: number;
  cityStats: {
    city: string;
    count: number;
  }[];
  termStats: {
    term: number;
    count: number;
  }[];
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container py-8">در حال بارگذاری...</div>;
  }

  if (!stats) {
    return <div className="container py-8">خطا در دریافت اطلاعات</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">داشبورد مدیریت</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تعداد فراگیران</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">شهرستان‌ها</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cities}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">میانگین ترم</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageTerm.toFixed(1)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cities">آمار شهرستان‌ها</TabsTrigger>
          <TabsTrigger value="terms">آمار ترم‌ها</TabsTrigger>
        </TabsList>
        <TabsContent value="cities" className="space-y-4">
          <div className="h-[400px]">
            <Bar
              data={{
                labels: stats.cityStats.map((stat) => stat.city),
                datasets: [
                  {
                    label: 'تعداد فراگیران',
                    data: stats.cityStats.map((stat) => stat.count),
                    backgroundColor: 'hsl(var(--chart-1))',
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="terms" className="space-y-4">
          <div className="h-[400px]">
            <Bar
              data={{
                labels: stats.termStats.map((stat) => `ترم ${stat.term}`),
                datasets: [
                  {
                    label: 'تعداد فراگیران',
                    data: stats.termStats.map((stat) => stat.count),
                    backgroundColor: 'hsl(var(--chart-2))',
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
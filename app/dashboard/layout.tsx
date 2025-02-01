'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LayoutDashboard, LogOut, Users } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  admin?: boolean;
}

const navItems: NavItem[] = [
  {
    title: 'داشبورد',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'فراگیران',
    href: '/dashboard/admin/users',
    icon: Users,
    admin: true,
  },
  {
    title: 'پروفایل',
    href: '/profile',
    icon: User,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((user) => {
        setIsAdmin(user.role === 'ADMIN');
      });
  }, []);

  const filteredNavItems = navItems.filter(
    (item) => !item.admin || (item.admin && isAdmin)
  );

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">منو</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                  <div className="flex flex-col space-y-3 p-4">
                    {filteredNavItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <span
                          className={cn(
                            'flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                            pathname === item.href
                              ? 'bg-accent text-accent-foreground'
                              : 'transparent'
                          )}
                        >
                          <item.icon className="ml-2 h-4 w-4" />
                          {item.title}
                        </span>
                      </Link>
                    ))}
                    <Link href="/api/auth/logout">
                      <span className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                        <LogOut className="ml-2 h-4 w-4" />
                        خروج
                      </span>
                    </Link>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="hidden items-center space-x-6 md:flex">
              {filteredNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={cn(
                      'flex items-center text-sm font-medium transition-colors hover:text-foreground/80',
                      pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                    )}
                  >
                    <item.icon className="ml-2 h-4 w-4" />
                    {item.title}
                  </span>
                </Link>
              ))}
              <Link href="/api/auth/logout">
                <span className="flex items-center text-sm font-medium transition-colors hover:text-foreground/80">
                  <LogOut className="ml-2 h-4 w-4" />
                  خروج
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
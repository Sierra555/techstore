'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    title: 'Profile',
    path: '/user/profile'
  },
  {
    title: 'Orders',
    path: '/user/orders'
  }
]

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      {
        links.map((item) => (
          <Link key={item.path} href={item.path} className={ cn(
            'text-sm font-medium transition-colors hover:text-primary', pathname.includes(item.path) ? '' : 'text-muted-foreground')}> 
            {item.title}
          </Link>
        ))
      }
    </nav>
  );
};

export default MainNav;
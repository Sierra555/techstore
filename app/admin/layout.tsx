import type { Metadata } from "next";
import { APP_NAME } from '@/lib/constansts';
import Link from "next/link";
import Menu from "@/components/shared/header/menu";
import Image from "next/image";
import MainNav from "./main-nav";
import AdminSearch from "@/components/admin/admin-search";

export const metadata: Metadata = {
  title: {
    template: `%s | Tech Store`,
    default: APP_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex items-center h-16 wrapper">
              <Link href='/' aria-label="Go to the main page">
                  <Image 
                      className="hidden md:block dark:hidden"
                      src='/images/logo-black.svg' 
                      alt={`${APP_NAME} logo`}
                      height={50} 
                      width={150} 
                      priority={true}
                  />
                    <Image 
                      className="hidden dark:md:block"
                      src='/images/logo-white.svg' 
                      alt={`${APP_NAME} logo`}
                      height={50} 
                      width={150} 
                      priority={true}
                  />
                  <Image 
                      className="md:hidden"
                      src='/images/logo.svg' 
                      alt={`${APP_NAME} logo`}
                      height={48} 
                      width={48} 
                      priority={true}
                  />
              </Link>
            <MainNav className='mx-6' />
            <div className="ml-auto items-center flex space-x-4">
              <AdminSearch />
              <Menu />
            </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto">
        {children}
      </div>
    </div>
    </>
  );
}

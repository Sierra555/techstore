import { APP_NAME } from "@/lib/constansts";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import CategoryDrawer from "./category-drawer";
import Search from "./search";

const Header = async () => {
  return (
    <header className="w-full border-b shadow-sm">
        <div className="wrapper flex-between">
            <div className="flex-start">
                <div className="block md:hidden">
                    <CategoryDrawer />
                </div>
                <Link 
                    href='/'
                    aria-label="Go to the main page"
                    className="ml-4"
                 >
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
            </div>
            <div className="hidden md:block">
                <Search />
            </div>
            <Menu />
        </div> 
    </header>
  );
};

export default Header;
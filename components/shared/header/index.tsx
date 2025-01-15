import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constansts";
import { ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ModeToggle from "./mode-toggle";

const Header = () => {
  return (
    <header className="w-full border-b shadow-sm">
        <div className="wrapper flex-between">
            <div className="flex-start">
                <Link 
                    href='/'
                    className="flex-start"
                >
                    <Image 
                        className="hidden md:block"
                        src='/images/logo-black.svg' 
                        alt={`${APP_NAME} logo`}
                        height={50} 
                        width={150} 
                        priority={true}
                    />
                    <Image 
                        className="md:hidden"
                        src='/images/short-logo.png' 
                        alt={`${APP_NAME} logo`}
                        height={48} 
                        width={48} 
                        priority={true}
                    />
                </Link>
            </div>
            <div className="space-x-2">
                <ModeToggle />
                <Button asChild variant='ghost'>
                    <Link href='/cart'>
                        <ShoppingCart /> Cart
                    </Link>
                </Button>
                <Button asChild>
                    <Link href='/sign-in'>
                        <UserIcon /> Sign In
                    </Link>
                </Button>
            </div>
        </div>
      
    </header>
  );
};

export default Header;
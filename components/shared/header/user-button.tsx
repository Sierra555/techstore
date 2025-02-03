import Link from 'next/link';
import { auth } from '@/auth';
import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button asChild>
        <Link href='/sign-in'>
          <UserIcon /> Sign In
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex items-center'>
            <Button
              variant='ghost'
              aria-label='user menu'
              className='w-[30px] h-[30px] p-0 rounded-full ml-2 bg-gray-200'
            >
              {session.user?.image ? 
              <Image 
                src={session.user.image}
                alt='User avatar'
                className='rounded-full object-contain object-center'
                height={30}
                width={30}
                priority={true}
              />
               : firstInitial }
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <div className='text-sm font-medium leading-none'>
                {session.user?.name}
              </div>
              <div className='text-sm text-muted-foreground leading-none'>
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link href='/user/profile' className='w-full'>
              User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/user/orders' className='w-full'>
              Order History
            </Link>
          </DropdownMenuItem>

          {session?.user?.role === 'admin' && (
            <DropdownMenuItem>
              <Link href='/admin/overview' className='w-full'>
                Admin
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className='p-0 mb-1'>
            <form action={signOutUser} className='w-full'>
              <Button
                className='w-full py-4 px-2 h-4 justify-start'
                variant='ghost'
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
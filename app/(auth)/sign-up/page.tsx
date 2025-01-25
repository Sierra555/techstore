import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'; 
import { APP_NAME } from "@/lib/constansts";
import SignUpForm from './signup-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign up',
};

type SignUpPageProps = {
  searchParams: Promise<{callbackUrl: string}>;
}

const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
  const session = await auth();
  const { callbackUrl } = await searchParams;

  if (session) {
    return redirect(callbackUrl || '/');
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className="space-y-4 className='flex-center'">
          <Link href='/' className='flex-center'>
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
          </Link>
          <CardTitle className='text-center'>Sign up</CardTitle>
          <CardDescription className='text-center'>
            Enter your information below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
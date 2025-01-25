'use client';
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constansts";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Image src='/images/logo-black.svg' width={150} height={50} alt={`${APP_NAME} logo`} priority={true} />
      <div className='flex-center flex-col p-6 w-full sm:w-1/2 rounded-lg shadow-md text-center'>
        <h1 className='text-3xl font-bold mb-4'>Not Found</h1>
        <p className='text-destructive'>Could not find requested page</p>
        <Button
          variant='outline'
          className='mt-4 ml-2'
          onClick={() => (window.location.href = '/')}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
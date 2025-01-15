import Link from 'next/link';
import { Button } from './ui/button';

const ViewAllButton = () => {
  return (
    <div className="flex justify-center items-cetner my-8">
        <Button asChild className='px-8 py-4 text-lg font-semibold cursor-pointer'>
            <Link href='/search'>View All Products</Link>
        </Button>
    </div>
  );
};

export default ViewAllButton;
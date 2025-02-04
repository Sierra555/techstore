import { Product } from "@/types";
import { cn } from '@/lib/utils';

const ShowPrice = ({ product } : { product: Product }) => {
  return (
    <div className='flex flex-col gap-1'>
      { product.isFeatured && (
        <p className="font-bold text-sm line-through">${((Number(product.price) * 0.15 + Number(product.price)).toFixed(2)).toString()}</p>
      )}
      <p className={cn("font-bold", product.isFeatured ? 'text-red-500' : '')}>${product.price}</p>
    </div>
  );
};

export default ShowPrice;
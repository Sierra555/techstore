import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Rating from './rating';
import ShowPrice from './show-price';

const ProductCard = ({ product } : { product: Product }) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-6 items-center justify-center sm:h-[350px] md:h-[300px]'>
        <Link href={`/product/${product.slug}`} className='cursor-pointer'>
          <Image className='max-h-[300px]' src={product.images[0]} alt={product.name} height={300} width={300} priority={true} />
        </Link>
      </CardHeader>
      <CardContent className='p-4 grid gap-4'>
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`} className='cursor-pointer'>
            <h2 className='text-sm font-medium'>{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
            <Rating value={Number(product.rating)} />
            {product.stock > 0 ? (
               <ShowPrice product={product} />
            ) : (
                <p className='text-gray-500'>Out of stock</p>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
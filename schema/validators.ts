import {z} from 'zod';
import { formatNumWithDecimal } from '@/lib/utils';

const currency = z
.string()
.refine((val)=> /^\d+(\.\d{2})?$/.test(formatNumWithDecimal(Number(val))), 
    'Price must have two decimal places'
);

export const InserProductSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters'),
    category: z.string().min(3, 'Category must be at least 3 characters'),
    images: z.array(z.string()).min(1,'At least one image'),
    brand: z.string().min(3, 'Brand must be at least 3 characters'),
    stock: z.coerce.number(),
    numReviews: z.number(),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
});
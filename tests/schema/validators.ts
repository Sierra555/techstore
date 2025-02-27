import {z} from 'zod';
import { formatNumWithDecimal } from '@/lib/utils';
import { PAYMENT_METHODS } from '@/lib/constansts';

const currency = z
.string()
.refine((val)=> /^\d+(\.\d{2})?$/.test(formatNumWithDecimal(Number(val))), 
    'Price must have two decimal places'
);

export const insertProductSchema = z.object({
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

export const updateProductSchema = insertProductSchema.extend({
    id: z.string().min(1, 'Id is required'),
})

export const signInFormSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpFormSchema = z.object({
    name: z.string().min(2, 'name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),

}).refine((data) => data.password ===data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export const cartItemSchema = z.object({
    productId: z.string().min(1, 'Product is required'),
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    category: z.string().min(1, 'Category is required'),
    qty: z.number().int().nonnegative('Quntity must be positive number'),
    image: z.string().min(1, 'Image is required'),
    price: currency,
})

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1, 'Session cart id is required'),
    userId: z.string().optional().nullable(),
});

export const shippingAddressSchema = z.object({
    fullName: z.string().min(3, 'Name must be at least 3 characters'),
    streetAddress: z.string().min(3, 'Name must be at least 3 characters'),
    city: z.string().min(3, 'City must be at least 3 characters'),
    zipCode: z.string().min(3, 'Zip code must be at least 3 characters'),
    country: z.string().min(3, 'Country must be at least 3 characters'),
    lat: z.number().optional(),
    lng: z.number().optional(),
});

export const paymentMethodSchema = z.object({
    type: z.string().min(1, 'Payment method is required')
}).refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Invalid payment method',
});

export const insertOrderSchema = z.object({
    userId: z.string().min(1, 'UserId is required'),
    itemsPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    totalPrice: currency,
    paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
        message: 'Invalid payment method'
    }),
    shippingAddress: shippingAddressSchema,
});

export const insertOrderItemSchema = z.object({
    productId: z.string(),
    slug: z.string(),
    image: z.string(),
    name: z.string(),
    price: currency,
    qty: z.number(),
});

export const paymentResultSchema = z.object({
    id: z.string(),
    status: z.string(),
    email_address: z.string(),
    pricePaid: z.string(),
});

export const updateProfileSchema = z.object({
    name: z.string().min(3, 'Name should have at least 3 characters'),
    email: z.string().email(),
});

export const updateUserSchema = updateProfileSchema.extend({
    id: z.string().min(1, 'Id is required'),
    role: z.string().min(1, 'Role is required'),
});

export const insertReviewSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 charcters'),
    description: z.string().min(3, 'Title must be at least 3 charcters'),
    productId: z.string().min(1, 'Product is required'),
    userId: z.string().min(1, 'User is required'),
    rating: z.coerce.number().int().min(1, 'Rating must be at least 1').max(5,'Rating must be at most 5'),
})
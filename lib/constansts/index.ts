export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Tech Store';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Find your device';
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT || 4);

export type benefits = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any,
    title: string,
    description: string,
}

export const benefits = [
    {
        icon: '/assets/icons/shipping.svg',
        title: 'Free Shipping',
        description: 'Free shipping for order above $150',
    },
    {
        icon: '/assets/icons/support.svg',
        title: 'Money Back Guarantee',
        description: 'Within 30 days of purchase',
    },
    {
        icon: '/assets/icons/payment.svg',
        title: 'Online Support',
        description: '24 hours a day, 7 days a week',
    },
    {
        icon: '/assets/icons/dollar.svg',
        title: 'Flexible Payment',
        description: 'Pay with multiple payment cards',
    },
];

export const signInDefaultvalues = {
    email: '',
    password: ''
}

export const signUpDefaultvalues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export const shippingAddressDefaultvalues = {
    fullName: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    country: '',
}

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS ?
process.env.PAYMENT_METHODS.split(', ') : ['PayPal', 'Stripe', 'CashOnDelivery'];

export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 8;

export const productDefaultValues = {
    name: '',
    slug: '',
    category: '',
    images: [],
    brand: '',
    description: '',
    price: '',
    stock: 0,
    rating: 0,
    numReviews: 0,
    isFeatured: false,
    banner: null,
};

export const USER_ROLES = process.env.USER_ROLES ? process.env.USER_ROLES.split(', ') : ['user', 'admin'];

export const reviewsFormDefaulValues ={
    title: '',
    comment: '',
    rating: 0,
};

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev'
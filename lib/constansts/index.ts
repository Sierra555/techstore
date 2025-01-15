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
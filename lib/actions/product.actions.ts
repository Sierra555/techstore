'use server';

import { convertToPlainObject } from '@/lib/utils';
import { prisma } from "@/db/prisma";
import { LATEST_PRODUCTS_LIMIT } from '../constansts';

export async function getLatestProducts() {
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc'}
    })

    return convertToPlainObject(data);
}

export async function getProductBySlug(slug: string) {
    const data = await prisma.product.findUnique({
        where: { slug: slug }
    });

    return data;
}
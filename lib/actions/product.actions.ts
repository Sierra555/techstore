/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { convertToPlainObject, formatError } from '@/lib/utils';
import { prisma } from "@/db/prisma";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from '../constansts';
import { revalidatePath } from 'next/cache';
import { insertProductSchema, updateProductSchema } from '@/tests/schema/validators';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
      take: LATEST_PRODUCTS_LIMIT,
      orderBy: { createdAt: 'desc'}
  })

  return convertToPlainObject(data);
};

export async function getProductBySlug(slug: string) {
  const data = await prisma.product.findUnique({
      where: { slug: slug }
  });

  return data;
};

export async function getProductById(productId: string) {
  const product = await prisma.product.findFirst({
    where: { id: productId },
  });

  return convertToPlainObject(product);
}

export async function getAllProducts({ 
  query, 
  limit = PAGE_SIZE, 
  page, 
  category,
  price,
  rating,
  sort
 }: {
  query: string; 
  limit?: number;
  page: number;
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
  }) {

  const queryFilter: Prisma.ProductWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query,
            mode: 'insensitive',
          } as Prisma.StringFilter,
        }
      : {};

  const categoryFilter = category && category !== 'all'  ? { category } : {};

  const priceFilter: Prisma.ProductWhereInput = price && price !== 'all' ? { 
    price: {
      gte: Number(price.split('-')[0]),
      lte: Number(price.split('-')[1]),
    }
   } : {};

  const ratingFilter: Prisma.ProductWhereInput = rating && rating !== 'all' ? { 
    rating: {
      gte: Number(rating),
    }
   } : {};

  const data = await prisma.product.findMany({
    where: { 
      ...queryFilter, 
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
     },
    take: limit,
    skip: (page - 1) * limit,
    orderBy:
      sort === 'lowest' ? { price: 'asc'} :
      sort === 'highest' ? { price: 'desc' } :
      sort === 'rating' ? { rating: 'desc' } :
      { createdAt: 'desc' }
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPageCount: Math.ceil(dataCount / limit)
  }
};

export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExists) throw new Error('Product not found');

    await prisma.product.delete({ where: { id } });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export async function createProduct(data : z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);
    await prisma.product.create({
      data: product,
    })
    
    return {
      success: true,
      message: 'Product created successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export async function updateProduct(data : z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);

    const existProduct = await prisma.product.findFirst({
      where: { id: product.id},
    });

    if (!existProduct) throw new Error('Product not found');

    await prisma.product.update({
      where: { id: product.id},
      data: product,
    })
    
    return {
      success: true,
      message: 'Product updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ['category'],
    _count: true,
  });

  return data;
};

export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: {
      isFeatured: true
    },
    orderBy: { 
      createdAt: 'desc'
    },
    take: 4
  });

  return convertToPlainObject(data);
}
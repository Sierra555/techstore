import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge'; 
import { Card, CardContent } from '@/components/ui/card'; 
import ProductImages from '@/components/shared/product/product-images';
import AddToCart from '@/components/shared/product/add-to-cart';
import { getMyCart } from '@/lib/actions/cart.actions';
import { auth } from '@/auth';
import ReviewList from './review-list';
import Rating from '@/components/shared/product/rating';
import ShowPrice from '@/components/shared/product/show-price';

type ProductPageParam = {
    params: Promise<{slug: string}>
}

const ProductPage = async ({ params } : ProductPageParam) => {
    const slug = (await params).slug;
    const product = await getProductBySlug(slug);
    const session = await auth();
    const userId = session?.user?.id;

    if (!product) notFound();

    const cart = await getMyCart();

  return (
    <>
      <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
              <div className="col-span-2 row-span-2 place-self-center">
                  <ProductImages images={product.images}/>
              </div>
              <div className="col-span-2 sm:col-span-1 md:col-span-2 p-5">
                  <div className="flex flex-col gap-6">
                      <p>
                          {product.brand} {product.category}
                      </p>
                      <h1 className="h3-bold">{product.name}</h1>
                      <Rating value={Number(product.rating)} />
                      <p>{product.numReviews} reviews</p>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items:center">
                        <ShowPrice product={product} />
                      </div>
                  </div>
                  <div className="mt-10">
                      <p className="font-semibold">Description</p>
                      <p>{product.description}</p>
                  </div>
              </div>
              <div className="col-span-3 md:col-span-2 lg:col-span-1 p-5">
                  <Card>
                      <CardContent className='p-4'>
                          <div className="mb-2 flex gap-3 justify-between">
                              <p>Price</p>
                              <ShowPrice product={product} />
                          </div>
                          <div className="mb-2 flex gap-3 justify-between">
                              <p>Stock</p>
                              {product.stock > 0 ? (
                                  <Badge variant='outline'>In stock</Badge>
                                  ) : (
                                  <Badge variant='destructive'>Out of stock</Badge>) }
                          </div>
                          <AddToCart 
                              cart={cart}
                              item={{
                                  productId: product.id,
                                  name: product.name,
                                  slug: product.slug,
                                  category: product.category,
                                  image: product.images![0],
                                  qty: 1,
                                  price: product.price
                              }} 
                              isInStock={+product.stock > 0}
                          />
                      </CardContent>
                  </Card>
              </div>
          </div>
      </section>
      <section className='mt-10'>
         <h2 className="h2-bold">Customer Reviews</h2>   
         <ReviewList userId={userId || ''} productId={product.id} productSlug={product.slug} />                  
      </section>
    </>
  );
};

export default ProductPage;
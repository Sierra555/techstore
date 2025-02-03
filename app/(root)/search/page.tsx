import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import { getAllProducts, getAllCategories } from "@/lib/actions/product.actions";
import { X } from "lucide-react";
import Link from "next/link";
import SortSelect from "./sort-select";

type SearchPageParams = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>
}

export async function generateMetadata({ searchParams }: SearchPageParams) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
  } = await searchParams;

  const isQuerySet = q && q !== 'all' && q.trim() !== '';
  const isCategorySet = category && category !== 'all' && category.trim() !== '';
  const isPriceSet = price && price !== 'all' && price.trim() !== '';
  const isRatingSet = rating && rating !== 'all' && rating.trim() !== '';

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search: 
        ${isQuerySet ? q: '' }  
        ${isCategorySet ? `Category ${category}`: '' }
        ${isPriceSet ? `Price ${price}`: ''} 
        ${isRatingSet ? `Rating ${rating}`: ''}`
    }
  }
  return {
    title: 'Search all products'
  };
}
const SearchPage = async ({ searchParams }: SearchPageParams) => {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1'
  } = await searchParams;

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page)
  });
  
  const categories = await getAllCategories();

  const prices = [
    {
      name: '$1-$100',
      value: '1-100'
    },
    {
      name: '$101-$500',
      value: '101-500'
    },
    {
      name: '$501-$1000',
      value: '501-1000'
    },
    {
      name: '$1001-$2000',
      value: '1001-2000'
    }
  ];

  const ratings = [ 4, 3, 2, 1];
  
  const sortOrders = ['newest', 'lowest', 'highest', 'rating'];

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-link">
        <div className="text-xl mb-2 mt-3">Categories</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link href={getFilterUrl({c: 'all'})} className={`${(category === 'all' 
                || category === '') && 'font-bold'}`}>
              All
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                  <Link href={getFilterUrl({c: x.category})}
                    className={`${(category === x.category) && 'font-bold'}`}
                  >
                    {x.category.charAt(0).toUpperCase() + x.category.slice(1)}
                  </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xl mb-2 mt-8">Price</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link href={getFilterUrl({p: 'all'})} className={`${(price === 'all') && 'font-bold'}`}>
              All
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                  <Link href={getFilterUrl({p: p.value})}
                    className={`${(price === p.value) && 'font-bold'}`}
                  >
                    {p.name}
                  </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xl mb-2 mt-8">Customers Ratings</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link href={getFilterUrl({r: 'all'})} className={`${(rating === 'all') && 'font-bold'}`}>
              All
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                  <Link href={getFilterUrl({r: `${r}`})}
                    className={`${(rating === r.toString()) && 'font-bold'}`}
                  >
                    {`${r} stars & up`}
                  </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4 space-y-4">
          <div className="flex-between flex-col md:flex-row my-4">
            <div className="flex items-center gap-3">
              { q !== 'all' && q !== '' && (
                <p>Results for <span className="font-bold">&quot;{q}&quot;</span></p>
              )}
              { category !== 'all' && category !== '' && (
                <p>Category: <span className="font-bold">{category}</span></p>
              )}
              { price !== 'all' && (
                <p>Price: <span className="font-bold">{price}</span></p>
              )}
              { rating !== 'all' && (
                <p>Ratings: <span className="font-bold">{rating}</span></p>
              )}
                {
                 (q !== 'all' && q !== '') || 
                 (category !== 'all' && category !== '') || 
                 (price !== 'all') || 
                 (rating !== 'all') ? 
                  (<Button type="button" asChild variant='link'>
                    <Link href='/search' className="flex items-center gap-1">Clear <X className="w-4 h-4" /></Link>
                  </Button>
                  ): null
                }
            </div>
            <div className="max-w-1/4">
              <SortSelect sort={sort} sortOrders={sortOrders} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {products.data.length > 0 ? (
              products.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
               ) : (
            <div> No results</div>
           )}
        </div>
      </div>
      
    </div>
  );
};

export default SearchPage;
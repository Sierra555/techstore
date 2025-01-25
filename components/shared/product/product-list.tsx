import { Product } from '@/types';
import ProductCard from './product-card';
import ViewAllProductsButton from '@/components/view-all-products-button';

type ProductListProps = {
    data: Product[];
    title?: string;
    limit?: number;
}

const ProductList = ({ data, title, limit } : ProductListProps) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <section className='section flex flex-col justify-center items-center'>
        <h2 className='h2-bold'>{title}</h2>
        {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {limitedData.map((product: Product) => (    
                    <ProductCard key={product.slug} product={product} />                
                    )
                )}
            </div>
        ) : (
            <div>
                <p>Np products found</p>
            </div>
        )}
        <ViewAllProductsButton />
    </section>
  );
};

export default ProductList;
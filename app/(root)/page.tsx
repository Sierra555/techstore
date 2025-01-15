import { getLatestProducts } from '@/lib/actions/product.actions';
import ProductList from '@/components/shared/product/product-list';
import ViewAllProductsButton from '@/components/view-all-products-button';
import IconBoxes from '@/components/icon-boxes';
import DealCountdown from '@/components/deal-countdown';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constansts';

const HomePage = async() => {
  const latestProducts = await getLatestProducts();

  return (
    <div className='flex flex-col justify-center items-center'>
      <ProductList data={latestProducts} title='Newest Arrivals' limit={LATEST_PRODUCTS_LIMIT} />
      <ViewAllProductsButton />
      <DealCountdown />
      <IconBoxes />
    </div>
  );
};

export default HomePage;
import { getLatestProducts } from '@/lib/actions/product.actions';
import ProductList from '@/components/shared/product/product-list';
import IconBoxes from '@/components/icon-boxes';
import DealCountdown from '@/components/deal-countdown';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constansts';

const HomePage = async() => {
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProducts} title='Newest Arrivals' limit={LATEST_PRODUCTS_LIMIT} />
      <DealCountdown />
      <IconBoxes />
    </>
  );
};

export default HomePage;
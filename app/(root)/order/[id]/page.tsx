import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import { ShippingAddress } from "@/types";
import OrderDetailsTable from "./order-details-table";

export const metadata: Metadata = {
  title: 'Check the order details'
};

type OrderPageProps = {
  params: Promise<{id: string}>
}

const OrderPage = async ({ params }: OrderPageProps) => {
  const orderId = (await params).id;
  const order = await getOrderById(orderId);

  if (!order) notFound();

  return <OrderDetailsTable order={{
    ...order,
    shippingAddress: order.shippingAddress as ShippingAddress
  }}  
  paypalClientId={process.env.PAYPAl_CLIENT_ID || 'sb'}
  />
};

export default OrderPage;
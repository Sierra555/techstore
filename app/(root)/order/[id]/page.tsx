import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import { ShippingAddress } from "@/types";
import OrderDetailsTable from "./order-details-table";
import { auth } from "@/auth";
import Stripe from 'stripe';

export const metadata: Metadata = {
  title: 'Check the order details'
};

type OrderPageProps = {
  params: Promise<{id: string}>
}

const OrderPage = async ({ params }: OrderPageProps) => {
  const orderId = (await params).id;
  const order = await getOrderById(orderId);
  const session = await auth();

  if (!order) notFound();

  let client_secret = null;

  if (!order.isPaid && order.paymentMethod === 'Stripe') {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100) ,
      currency: 'USD',
      metadata: { orderId: order.id},
    });

    client_secret = paymentIntent.client_secret;
  }

  return <OrderDetailsTable order={{
    ...order,
    shippingAddress: order.shippingAddress as ShippingAddress
  }}  
  stripeClientSecret={client_secret}
  paypalClientId={process.env.PAYPAl_CLIENT_ID || 'sb'}
  isAdmin={session?.user.role === 'admin'}
  />
};

export default OrderPage;
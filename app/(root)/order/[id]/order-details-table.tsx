'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { 
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { 
  createPayPalOrder, 
  approvePayPalOrder, 
  updateOrderToPaidCOD,
  deliverOrder
} from "@/lib/actions/order.actions";
import { toast, useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import StripePayment from "./stripe-payment";

const OrderDetailsTable = ({ order, paypalClientId, isAdmin, stripeClientSecret }: { order: Omit<Order, 'paymentResult'>; paypalClientId: string; isAdmin: boolean; stripeClientSecret: string | null }) => {
  const {
    id,
    shippingAddress,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
   } = order;

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = '';

    if (isPending) {
      status = 'Loading PayPal...';
    } else if (isRejected) {
      status = 'Error loading PayPal...';
    }
    return status;
  };

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(order.id);

    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message
      });
    }

    return res.data
  };

  const handleApprovePayPalOrder = async (data: {orderID: string}) => {
    const res = await approvePayPalOrder(order.id, data);

    toast({
      variant: res.success ? 'default' : 'destructive',
      description: res.message
    });
  }

  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    return (
      <Button 
        type='button'
        className="w-full"
        disabled={isPending}
        onClick={() => startTransition(async () => {
          const res = await updateOrderToPaidCOD(order.id);

          toast({
            variant: res.success ? 'default' : 'destructive',
            description: res.message
          });
        })}
      >
        {isPending ? 'Processing...' : 'Mark as paid'}
      </Button>
    )
  };

  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    return (
      <Button 
        type='button'
        className="w-full"
        disabled={isPending}
        onClick={() => startTransition(async () => {
          const res = await deliverOrder(order.id);

          toast({
            variant: res.success ? 'default' : 'destructive',
            description: res.message
          });
        })}
      >
        {isPending ? 'Processing...' : 'Mark as delivered'}
      </Button>
    )
  };

  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          <Card>
            <CardContent className="p-4 gap-4">
                <h2 className="text-xl pb-4">Payment method</h2>
                <p className="mb-2">{paymentMethod}</p>
                {isPaid ? (
                  <Badge variant="secondary">Paid at {formatDateTime(paidAt!).dateTime}</Badge>
                ) : (
                  <Badge variant="destructive">Not paid yet</Badge>
                )}
            </CardContent>
          </Card>
          <Card className="my-2">
            <CardContent className="p-4 gap-4">
                <h2 className="text-xl pb-4">Shipping address</h2>
                <p>{shippingAddress.fullName}</p>
                <p className="mb-2">{shippingAddress.streetAddress}, {shippingAddress.city}</p>
                <p>{shippingAddress.zipCode}, {shippingAddress.country}</p>
                {isDelivered ? (
                  <Badge variant="secondary">Delivered at {formatDateTime(deliveredAt!).dateTime}</Badge>
                ) : (
                  <Badge variant="destructive">Not delivered yet</Badge>
                )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
            <h2 className="text-xl pb-4">Order items</h2>
            <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quanity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item) => (
                      <TableRow key={item.slug}>
                         <TableCell>
                          <Link href={`/product/${item.slug}`} className="flex
                          items-center gap-4">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                            <span className="p-x-2">{item.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell className="px-2">{item.qty}</TableCell>
                        <TableCell className="text-right">{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className='p-4 gap-4 space-y-4'>
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
              {/* <PayPal Payment/> */}
              { !isPaid && paymentMethod === 'PayPal' && (
                <div>
                  <PayPalScriptProvider options={{clientId: paypalClientId}}>
                    <PrintLoadingState />
                    <PayPalButtons createOrder={handleCreatePayPalOrder} onApprove={handleApprovePayPalOrder} />
                  </PayPalScriptProvider>
                </div>
              )}
              {/* Stripe Payment */}
              { !isPaid && paymentMethod === 'Stripe' && stripeClientSecret && (
                <StripePayment
                  priceInCents={Number(order.totalPrice) * 100}
                  orderId={order.id}
                  clientSecret={stripeClientSecret}
                 />
              )} 
              {/* Cash On Delivery */}
              {isAdmin && !isPaid && paymentMethod === 'CashOnDelivery' && (
                <MarkAsPaidButton />
              )}
              {isAdmin && !isDelivered && isPaid && (
                <MarkAsDeliveredButton />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
import React from 'react';
import { getMyOrders } from '@/lib/actions/order.actions';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import Link from 'next/link';
import { Metadata } from 'next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Pagination from '@/components/shared/pagination';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'My orders'
};

type OrderPageParams = {
  searchParams: Promise<{page: string}>
}

const OrderPage = async ({ searchParams }: OrderPageParams ) => {
  const { page } = await searchParams;

  const orders = await getMyOrders({
    page: Number(page) || 1
  });

  return (
    <div className='space-y-2'>
      <h2 className="h2-bold">Orders</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
              {orders.data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{formatId(order.id)}</TableCell>
                  <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
                  <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                  <TableCell>{order.isPaid && order.paidAt ? formatDateTime(order.paidAt).dateTime : 'Not paid'}</TableCell>
                  <TableCell>{order.isDelivered && order.deliveredAt ?  formatDateTime(order.deliveredAt).dateTime : 'Not delivered'}</TableCell>
                  <TableCell>
                    <Button asChild variant='outline' size='sm'>
                      <Link href={`/order/${order.id}`}> 
                        Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
        { orders.totalPages > 1 && (
          <Pagination 
            page={Number(page) || 1} 
            totalPages={orders.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
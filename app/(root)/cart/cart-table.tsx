'use client';

import { Cart } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableCell, 
  TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const CartTable = ({ cart }: {cart?: Cart}) => {
  const router = useRouter()
  const { toast } = useToast();
  const [loading, setLoading] = useState({
    adding: false,
    removing: false
  });
  const [isPending, startTransition] = useTransition();
  const setLoadingStatus = (operation: string, status: boolean) => {
    setLoading((prev) => ({...prev, [operation]: status }))
  }

  return (
    <>
        <h1 className="py-4 h2-bold">Shopping Cart</h1>
        { !cart || cart.items.length === 0 ? (
          <div>
            Cart is empty. <Link href='/'>Go Shopping</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <Table>
                <TableHeader>
                  <TableRow className="flex flex-wrap  items-center sm:table-row">
                    <TableHead>Item</TableHead>
                    <TableHead className="flex-1 text-right sm:text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {cart.items.map((item) => (
                      <TableRow key={item.slug} className="flex flex-wrap justify-between items-center sm:table-row">
                        <TableCell>
                          <Link href={`product/${item.slug}`} className="flex
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
                        <TableCell className="p-4 flex-center gap-2">
                          <Button disabled={isPending} variant='outline' type="button"
                          onClick={async () => {
                            setLoadingStatus('removing', true);
                            startTransition(async () => {
                              const res = await removeItemFromCart(item.productId) ;
  
                              if(!res.success) {
                                toast({
                                  variant: 'destructive',
                                  description: res.message
                                })
                              }
                              setLoadingStatus('removing', false);
                            })
                          }
                            }>
                              { loading.removing ? (<Loader className="w-4 h-4 animate-spin" />) :
                               (<Minus className="w-4 h-4" />)
                               }
                          </Button>
                          <span>{item.qty}</span>
                          <Button disabled={isPending} variant='outline' type="button"
                          onClick={async () => {
                            setLoadingStatus('adding', true);
                            startTransition(async () => {
                              const res = await addItemToCart(item);

                              if(!res.success) {
                                toast({
                                  variant: 'destructive',
                                  description: res.message
                                })
                              }
                              setLoadingStatus('adding', false);
                            })}}>
                              { loading.adding ? (<Loader className="w-4 h-4 animate-spin" />) :
                               (<Plus className="w-4 h-4" />)
                               }
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          ${item.price}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <Card className="max-h-40">
              <CardContent className="p-4">
                  <div className="pb-3 text-xl space-y-4">
                    <p className="flex-between flex-wrap">Subtotal: ({cart.items.reduce((a,c) => a + c.qty, 0)}){' '}
                      <span className="font-bold">{formatCurrency(cart.itemsPrice)}</span>
                    </p>
                    <Button
                      className='w-full'
                      disabled={isPending}
                      onClick={() =>
                        startTransition(() => router.push('/shipping-address'))
                      }
                    >
                      Checkout{' '}
                      {isPending ? (
                        <Loader className='w-4 h-4 animate-spin' />
                      ) : (
                        <ArrowRight className='w-4 h-4' />
                      )}
                    </Button>
                  </div>
              </CardContent>
            </Card>
          </div>
        )}
    </>
  );
};

export default CartTable;
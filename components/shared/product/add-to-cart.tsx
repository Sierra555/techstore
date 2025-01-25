'use client';

import { Cart, CartItem } from "@/types";
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart } from '@/lib/actions/cart.actions';
import { removeItemFromCart } from '@/lib/actions/cart.actions';
import { useTransition } from "react";


const AddToCart = ({ cart, item, isInStock }: { cart?: Cart; item: CartItem; isInStock: boolean }) => {
		const router = useRouter();
		const { toast } = useToast();

		const [isPending, startTransition] = useTransition();


		const handleAddToCart = async () => {
			startTransition(async () => {
				const res = await addItemToCart(item);

				if (!res?.success) {
						toast({
								variant: 'destructive',
								description: res?.message
						})
						return;
				}

				toast({
						description: res?.message,
						action: (
								<ToastAction
										className="bg-primary text-white hover:bg-gray-800"
										altText="Go To Cart"
										onClick={() => router.push('/cart')}
								>
										Go to Cart
								</ToastAction>
						)
				})
			})	
		}

	const existItem = cart && cart.items.find((i) => i.productId === item.productId);

	const handleRemoveFromCart = async () => {
		startTransition(async () => {
			const res = await removeItemFromCart(item.productId);

			toast({
				variant: res.success ? 'default' : 'destructive',
				description: res.message,
				action: (
						<ToastAction
								className="bg-primary text-white hover:bg-gray-800"
								altText="Go To Cart"
								onClick={() => router.push('/cart')}
						>
								Go to Cart
						</ToastAction>
				)
			})	
		})
	}

	return (
		<>
		{existItem ? (
			<div className="flex justify-between items-center">
				<Button
					type="button"
					disabled={!isInStock}
					onClick={handleRemoveFromCart}
					variant="outline"
					aria-label={`Remove ${item.name} from cart`}
				>
					{isPending ? (<Loader className="h-4 w-4 animate-spin" /> ): (<Minus className="h-4 w-4" /> )}
				</Button>
				<span className="px-2">{existItem.qty}</span>
				<Button
					type="button"
					disabled={!isInStock}
					onClick={handleAddToCart}
					variant="outline"
					aria-label={`Add ${item.name} to cart`}
				>
					{isPending ? (<Loader className="h-4 w-4 animate-spin" /> ): (<Plus className="h-4 w-4" /> )}
					</Button>
			</div>
			
		) : (
			<Button
				className="w-full"
				type="button"
				disabled={!isInStock}
				onClick={handleAddToCart}
				aria-label={`Add ${item.name} to cart`}
		>
					{isPending ? (<Loader className="h-4 w-4 animate-spin" /> ): (<Plus /> )}{' '}
					Add To Cart
			</Button>
		)}
		</>
	);
};

export default AddToCart;
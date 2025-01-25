import { z } from "zod";
import { InsertProductSchema, insertCartSchema, cartItemSchema, shippingAddressSchema, insertOrderSchema, insertOrderItemSchema, paymentResultSchema } from "@/schema/validators";

export type Product = z.infer<typeof InsertProductSchema> & {
    id: string;
    rating: string;
    numReviews: number;
    createdAt: Date;
};

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof insertCartSchema>;

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
    id: string;
    createdAt: Date;
    isPaid: boolean;
    paidAt: Date | null;
    isDelivered: boolean;
    deliveredAt: Date | null;
    orderItems: OrderItem[];
    user: { name: string; email: string };
};

export type PaymentResult = z.infer<typeof paymentResultSchema>;
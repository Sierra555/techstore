import { z } from "zod";
import { InserProductSchema } from "@/schema/validators";

export type Product = z.infer<typeof InserProductSchema> & {
    id: string;
    rating: string;
    numReviews: number;
    createdAt: Date;
};
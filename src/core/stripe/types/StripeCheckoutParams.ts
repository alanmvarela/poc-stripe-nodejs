import { z } from "zod";
import { CheckoutParamsSchema } from "../schemas/checkout-params.schema";

export type StripeCheckoutParams = z.infer<typeof CheckoutParamsSchema>;

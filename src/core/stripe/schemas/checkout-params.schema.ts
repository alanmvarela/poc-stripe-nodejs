import { z } from 'zod';


export const LineItemSchema = z.object({
    price: z.string(),
    quantity: z.number()
});

// values from Stripe.Checkout.SessionCreateParams.Mode
export const PaymentModesSchema = z.union([
    z.literal('payment'),
    z.literal('setup'),
    z.literal('subscription'),
]);

export const CheckoutParamsSchema = z.object({
    customerId: z.optional(z.string()),
    email: z.optional(z.string().email()),
    lineItems: z.array(LineItemSchema).nonempty(),
    paymentMethod: PaymentModesSchema,
    createCustomer: z.boolean(),
}).refine(schema => 
    (schema.customerId && schema.email) ? false : true, 
{
    message: 'Data must have either a customerId or an email, not both.'
});

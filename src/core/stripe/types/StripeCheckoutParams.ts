import Stripe from "stripe";

export type StripeCheckoutParams = {
    customerId: string,
    email: string,
    lineItems: LineItem[],
    paymentMethod: Stripe.Checkout.SessionCreateParams.Mode
};

export type LineItem = {
    price: string,
    quantity: number
};

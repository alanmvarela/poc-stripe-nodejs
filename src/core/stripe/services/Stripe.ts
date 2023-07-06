import Stripe from 'stripe';

function getStripe() {
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2022-11-15',
    });
}

const createCustomer: (email: string) => Promise<string> = async (
    email
) => {
    const stripe = getStripe();
    const customer = await stripe.customers.create({
        email,
      });
    return customer.id;
};

const createCheckoutSession: (priceId: string, customerId: string, paymentMode: string) => Promise<string> = async (
    priceId,
    customerId,
    paymentMode
) => {
    const stripe = getStripe();

    // Validar si el usuario ya tiene un customer id de stripe

    const session = await stripe.checkout.sessions.create({
        mode: paymentMode as Stripe.Checkout.SessionCreateParams.Mode,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.APP_URL}`,
        cancel_url: `${process.env.APP_URL}`,
        //customer: customerId,
        customer_creation: 'always' as Stripe.Checkout.SessionCreateParams.CustomerCreation,
        allow_promotion_codes: true,
      });
    console.log(session);
    console.log(session.customer);
    return session.url;
};

const createPortalSession: (customerId: string) => Promise<string> = async (
    customerId
) => {
    const stripe = getStripe();
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.APP_URL}`,
      });
    return session.url;
};

export default {
    createCustomer,
    createCheckoutSession,
    createPortalSession,
};
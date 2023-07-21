import Stripe from 'stripe';
import { StripeCheckoutParams } from '../types/StripeCheckoutParams';

// stripe instance singleton
const stripe = (() => {
    let stripe: Stripe;
    return () => {
        if (!stripe) {
            stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
                apiVersion: '2022-11-15',
            });
        }
        return stripe;
    };
})();

const createCheckoutSession: (params: StripeCheckoutParams ) => Promise<string> = async (
    params
) => {
    // Prepare checkout generic session parameters
    const sessionParam: Stripe.Checkout.SessionCreateParams = {
        mode: params.paymentMethod,
        invoice_creation: {
            enabled: true,
        },
        line_items: params.lineItems,
        success_url: `${process.env.STRIPE_SUCCESS_URL}`,
        cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
      }

    // Add customer to session if exists
    if (params.customerId !== null){
        sessionParam.customer = params.customerId;
    } else {
        // Add user email to session and create customer if not exists
        sessionParam.customer_email = params.email;
        sessionParam.customer_creation = 'always' as Stripe.Checkout.SessionCreateParams.CustomerCreation;
    }

    try {
        const session = await stripe().checkout.sessions.create(sessionParam);
        if (!session) {
            throw new Error('Error creating checkout session');
        }
        return session.url;
    } catch (error) {
        throw new Error(error.message);
    }
};


const createWebhookEvent: (body: any, signature: string | string[]) => Promise<Stripe.Event> = async (
    body,
    signature
) => {
    return stripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
};

export default {
    createCheckoutSession,
    createWebhookEvent,
};
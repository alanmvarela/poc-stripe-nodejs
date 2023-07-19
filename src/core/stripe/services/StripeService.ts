import Stripe from 'stripe';
import StripeClient from '../clients/StripeClient';
import { StripeCheckoutParams } from '../types/StripeCheckoutParams';



const createCheckoutSession: (params: StripeCheckoutParams ) => Promise<string> = async (
    params
) => {
    // Define payment method for one time payment
    const paymenyMethod = 'payment';

    // Prepare checkout generic session parameters
    const sessionParam: Stripe.Checkout.SessionCreateParams = {
        mode: paymenyMethod,
        line_items: [
          {
            price: params.priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.STRIPE_SUCCESS_URL}`,
        cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
        payment_intent_data: {
            metadata: {
                'survey_id': params.surveyId,
            }
        },
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
        const session = await StripeClient.getStripeClient().checkout.sessions.create(sessionParam);
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
    return StripeClient.getStripeClient().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
};

export default {
    createCheckoutSession,
    createWebhookEvent,
};
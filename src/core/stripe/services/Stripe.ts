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
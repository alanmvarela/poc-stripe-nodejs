import Stripe from 'stripe';

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

const createCheckoutSession: (priceId: string, customerId: string, email: string, surveyId: string) => Promise<string> = async (
    priceId,
    customerId,
    email,
    surveyId
) => {

    // Define payment method for one time payment
    const paymenyMethod = 'payment';

    // Prepare checkout generic session parameters
    const sessionParam: Stripe.Checkout.SessionCreateParams = {
        mode: paymenyMethod,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.STRIPE_SUCCESS_URL}`,
        cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
        payment_intent_data: {
            metadata: {
                'survey_id': surveyId,
            }
        },
      }

    // Add customer to session if exists
    if (customerId !== null){
        sessionParam.customer = customerId;
    } else {
        // Add user email to session and create customer if not exists
        sessionParam.customer_email = email;
        sessionParam.customer_creation = 'always' as Stripe.Checkout.SessionCreateParams.CustomerCreation;
    }

    // Create checkout session
    try {
        const session = await stripe().checkout.sessions.create(sessionParam);
        if (!session) {
            throw new Error('Error creating checkout session');
        }
        return session.url;
    } catch (error) {
        // TBD - HOW DO WE WANT TO HANDLE RETURN ERRORS
        return error.message;
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
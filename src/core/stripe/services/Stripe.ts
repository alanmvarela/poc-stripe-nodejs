import Stripe from 'stripe';

function getStripe() {
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2022-11-15',
    });
}

const createCheckoutSession: (priceId: string, customerId: string, email: string, paymentMode: string) => Promise<string> = async (
    priceId,
    customerId,
    email,
    paymentMode
) => {

    // Get Stripe instance
    const stripe = getStripe();

    // Prepare checkout generic session parameters
    const sessionParam: Stripe.Checkout.SessionCreateParams = {
        mode: paymentMode as Stripe.Checkout.SessionCreateParams.Mode,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.STRIPE_SUCCESS_URL}`,
        cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
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
        const session = await stripe.checkout.sessions.create(sessionParam);
        if (!session) {
            throw new Error('Error creating checkout session');
        }
        return session.url;
    } catch (error) {
        // TBD - HOW DO WE WANT TO HANDLE RETURN ERRORS
        return error.message;
    }
};


export default {
    createCheckoutSession,
};
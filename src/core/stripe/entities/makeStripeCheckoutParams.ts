import { StripeCheckoutParams } from "../types/StripeCheckoutParams";
import stripeCheckoutParamsValidator from "../validators/stripeCheckoutParamsValidator";

const makeStripeCheckoutParams = (params: object) => {
    const { hasErrors, errors } = stripeCheckoutParamsValidator(params);

    if (hasErrors) return { errors };

    const validatedParams = {
        ...params,
    } as StripeCheckoutParams;

    return {params:validatedParams};
};

export default makeStripeCheckoutParams;

import { StripeCheckoutParams } from "../types/StripeCheckoutParams";

// Validator imports
import { notEmpty, isEmail } from "../../Validator/rules";
import makeValidator from "../../Validator";

const rules = {
    email: [isEmail()],
};

const stripeCheckoutParamsValidator = makeValidator<StripeCheckoutParams>(rules);

export default stripeCheckoutParamsValidator;
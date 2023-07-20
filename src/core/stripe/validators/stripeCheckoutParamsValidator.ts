import { StripeCheckoutParams } from "../types/StripeCheckoutParams";

// Validator imports
import { notEmpty, isEmail } from "../../Validator/rules";
import makeValidator from "../../Validator";

const rules = {
    priceId: [notEmpty()],
    email: [isEmail()],
    surveyId: [notEmpty()],
};

const stripeCheckoutParamsValidator = makeValidator<StripeCheckoutParams>(rules);

export default stripeCheckoutParamsValidator;

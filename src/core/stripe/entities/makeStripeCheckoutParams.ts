import { StripeCheckoutParams } from "../types/StripeCheckoutParams";

const makeStripeCheckoutParams = (params: object) => {
  // TODO - Validations

  const validatedUser = {
    ...params,
  } as StripeCheckoutParams;

  return validatedUser;
};

export default makeStripeCheckoutParams;
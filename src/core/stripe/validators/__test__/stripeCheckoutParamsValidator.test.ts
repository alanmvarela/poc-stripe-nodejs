import stripeCheckoutParamsValidator from '../stripeCheckoutParamsValidator';

describe('stripeCheckoutParamsValidator', () => {
  it('should return no errors for valid params', () => {
    // Set the mock data for the stripeCheckoutParamsValidator function
    const validParams = {
      priceId: 'fake_price_id',
      email: 'test@example.com',
      surveyId: 'fake_survey_id',
    };

    // Call the stripeCheckoutParamsValidator function
    const validationResult = stripeCheckoutParamsValidator(validParams);

    // Assert that the result contains no errors
    expect(validationResult.hasErrors).toBe(false);
    expect(validationResult.errors).toEqual({});
  });

  it('should return errors for invalid params', () => {
    // Set the mock data for the stripeCheckoutParamsValidator function
    const invalidParams = {
      priceId: '', // Invalid: empty priceId
      email: 'invalid_email', // Invalid: invalid email format
      surveyId: '', // Invalid: empty surveyId
    };

    // Call the stripeCheckoutParamsValidator function
    const validationResult = stripeCheckoutParamsValidator(invalidParams);

    // Assert that the result contains the validation errors
    expect(validationResult.hasErrors).toBe(true);
    expect(validationResult.errors).toEqual({
      priceId: ["priceId can't be empty."],
      email: ["email \"" + invalidParams.email + "\" is not a valid email."],
      surveyId: ["surveyId can't be empty."],
    });
  });
});

import stripeCheckoutParamsValidator from '../../validators/stripeCheckoutParamsValidator';
import makeStripeCheckoutParams from '../makeStripeCheckoutParams';

// Mock the stripeCheckoutParamsValidator
jest.mock('../../validators/stripeCheckoutParamsValidator');

describe('makeStripeCheckoutParams', () => {
    // Set the mock data for the makeStripeCheckoutParams function
    const params = {
        priceId: 'fake_price_id',
        customerId: 'fake_customer_id',
        email: 'test@example.com',
        surveyId: 'fake_survey_id',
      };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return validated params when validation passes', () => {
        // Mock the validation function to return no errors
        (stripeCheckoutParamsValidator as jest.Mock).mockReturnValue({ hasErrors: false, errors: {} });

        // Call the makeStripeCheckoutParams function
        const result = makeStripeCheckoutParams(params);

        // Assert that the validation function is called with the correct arguments
        expect(stripeCheckoutParamsValidator).toHaveBeenCalledWith(params);

        // Assert that the result contains the validated params
        expect(result).toEqual({ params });
    });

    it('should return errors when validation fails', () => {
        // Set the mock validation errors
        const validationErrors = {
            priceId: 'Invalid price ID',
            customerId: 'Invalid customer ID',
            email: 'Invalid email',
        };

        // Mock the validation function to return errors
        (stripeCheckoutParamsValidator as jest.Mock).mockReturnValue({ hasErrors: true, errors: validationErrors });

        // Call the makeStripeCheckoutParams function
        const result = makeStripeCheckoutParams(params);

        // Assert that the result contains the validation errors
        expect(result).toEqual({ errors: validationErrors });
    });
});

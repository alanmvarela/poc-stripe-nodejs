# poc-stripe-nodejs

A Stripe integration with NodeJs+Typescript. This API let's you perform basic operations such as creating a customer, manage a checkout session and manage a portal session with using the Stripe API.

## Tech Stack

**Server:** NodeJs, Typescript

## Run Locally

Clone the project

```bash
  git clone https://github.com/alanmvarela/poc-stripe-nodejs.git
```

Copy .env.example and populate STRIPE_SECRET_KEY with the Stripe Test Secret Key

```bash
  cp .env.example .env
```

Install dependencies

```bash
  npm i
```

Run the start:dev command

```bash
  npm run start:dev
```

## Testing

### Prerequisites

- Create Stripe account and get test api key.
- Populate test api key in .env.
- Create Stripe Product Id based on [Stripe Products and Prices](https://stripe.com/docs/products-prices/overview#create-prices).
- Replace src/requests.http Product Id with the one created in stripe.
- Start app locally.
- Send requests.

### Manual Testing

To manually test the API you can use the src/requests.http file that contains samples of each request accepted by the api.

## Lessons Learned

While creating the Stripe API integration with nodejs we came to below conclussions:

- Stripe API main functionalities are customer, checkout-session and portal-session.

## Next Steps

- Add validation to api request body parameters.
- Add logic to validate if a customer needs to be created or not.
- Add logic to recover a customer id from a session id when neccesary.
- Add error handling for the api.
- Add error logging for the api.
- Update requests.http file with error scenarios.
- Add Documentation to the code.
- Store productids.
- Add Unit test.
- Add Integration test.

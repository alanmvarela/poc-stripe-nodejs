import express from 'express';
import Stripe from './core/stripe/services/Stripe';
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/../.env' });


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/create-customer', async (req, res) => {
  const email = req.body.email;
  const customerId = await Stripe.createCustomer(email); 
  res.send(customerId);
});

app.post('/checkout-session', async (req, res) => {
  const priceId = req.body.priceId;
  // TODO - Customer id should be recovered from authenticated user
  const customerId = req.body.customerId;
  const paymentMode = req.body.paymentMode;
  const sessionUrl = await Stripe.createCheckoutSession(priceId, customerId,paymentMode);
  res.send(sessionUrl);
});

app.post('/portal-session', async (req, res) => {
  // TODO - Customer id should be recovered from authenticated user
  const customerId = req.body.customerId;
  const sessionUrl = await Stripe.createPortalSession(customerId);
  res.send(sessionUrl);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

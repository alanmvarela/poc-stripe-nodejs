import express from 'express';
import Stripe from './core/stripe/services/Stripe';
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/../.env' });


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/checkout-session', async (req, res) => {
  const priceId = req.body.priceId;
  const customerId = (req.body.customerId) ? req.body.customerId : null;
  const email = req.body.email;
  const paymentMode = req.body.paymentMode;
  const sessionUrl = await Stripe.createCheckoutSession(priceId, customerId, email, paymentMode);
  res.send(sessionUrl);
});

app.get('/success', async (req, res) => {
  res.send('Congrats you did it!!');
});

app.get('/cancel', async (req, res) => {
  res.send('Booo, you canceled!!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

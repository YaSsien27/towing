// backend/models/stripe.js
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config(); 

const stripe = new Stripe('sk_test_51RGhSzFNC9lumuodSM9OScNcvhnCAEVf6SL4Ysi9xq04dhnrPFqkt72YnhVSOUKwJne2N2mQstxdbW0sdopQ66xM00Plw8XaqC');

export default stripe;
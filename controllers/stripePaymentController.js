const e = require('express');
const db = require('../config/db');
const stripe = require('stripe')(process.env.STRIPE_KEY);

async function createCheckoutSession(currencyData, productName, price, quantityData, modeData, urlSuccess, urlCancel) {
    try {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: currencyData,
                            product_data: {
                                name: productName,
                            },
                            unit_amount: price * 100,
                        },
                        quantity: quantityData,
                    },
                ],
                mode: modeData,
                success_url: urlSuccess,
                cancel_url: urlCancel,
            });
            
            return session.url;
    } catch (error) {
        console.error('Error during checkout session creation:', error);
        throw error;
    }
}

module.exports = { createCheckoutSession };

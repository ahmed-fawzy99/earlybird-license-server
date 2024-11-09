/**
 * Send webhook to EarlyBird API to set an API key that Earlybird will use to send requests to your API.
 *
 * @example
 * // Sample usage
 * npm run set-api-key or node src/set-earlybird-api-webhook.js
 */

import axios from 'axios';
import { randomBytes } from 'crypto';
import {writeToEnv} from "./helpers.js";
import dotenv from 'dotenv';
dotenv.config()


function generateKey(size = 32, format = 'hex') {
    const key = randomBytes(size).toString(format).toUpperCase();
    writeToEnv('EARLYBIRD_API_KEY', key);

    // You should also persist the key in your database.

    return key;
}



async function sendWebhook() {
    generateKey();
    try {
        const response = await axios.post(process.env.EARLYBIRD_WEBHOOK_ENDPOINT, null, {
            headers: {
                'PARTNER_API_KEY': process.env.PARTNER_API_KEY,
                'PARTNER_ULID': process.env.PARTNER_ULID,
                'EARLYBIRD_API_KEY': generateKey(),
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

sendWebhook()
    .then(response => {
        console.log('Webhook Response:', response);
    })
    .catch(error => {
        console.error('Webhook Error:', error);
    });

import express from "express";
import morgan from "morgan";
import dotenv from 'dotenv';
import cors from 'cors'; // only for development to allow localhost to access the server

import {generateLicense} from "./helpers.js";

const app = express();
const port = 2604;
dotenv.config()

// Replace this with earlybird API KEY that you sent to the earlybird via webhook. Value set in .env file
const EARLYBIRD_API_KEY = process.env.EARLYBIRD_API_KEY;

// Middleware to check API key
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey && apiKey === EARLYBIRD_API_KEY) {
        next(); // API key is correct, proceed to the next middleware or route
    } else {
        res.status(403).json({ error: "FORBIDDEN: Invalid API Key" });
    }
};

// Middleware for logging and response time
app.use(morgan("dev"));

// Middleware to allow cross-origin requests. Only for development
app.use(cors());

// Health check endpoint
app.get("/service-health", (req, res) => {
    res.json({ status: "HEALTHY" });
});

/**
 * Endpoint to check product availability with quantity.
 * NOTE: Earlybird uses your internal product_id and plan_id that you provided during the onboarding process.
 *
 * @example
 * // Sample request usage
 * https://your-domain.com/product/375/9427/2
 */
app.get("/product/:id/:planId/:qty", (req, res) => {
    const { id, planId, qty } = req.params;

    // Your logic here to check if the product is available with the given quantity

    // If product is available with the given quantity:
    res.json({
        status: "OK",
        "product": {
            "id": id,
            "planId": planId,
            "qty": qty,
            "available": true
        }
    });

    // If product is not available with the given quantity:
    // res.status(404).json({ error: "INTERNAL PARTNER ERROR" });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Endpoint to get license key(s) for the product.
 * NOTE: Earlybird uses your internal product_id and plan_id that you provided during the onboarding process.
 *
 * @example
 * // Sample request usage
 * https://your-domain.com/getLicense/375/9427/2
 */
app.get("/getLicense/:id/:planId/:qty", apiKeyMiddleware, async (req, res) => {
    const { id, planId, qty } = req.params;
    await sleep(5000); // Simulate a delay of 1 second


    // Get qty number of license keys, with random values
    const licenses = Array.from({ length: qty }, (_, i) => ({
        [`license-${i + 1}`]: generateLicense(12)
    }));

    // Format the response structure as requested
    const response = {
        [`product${id}`]: {
            [`plan${planId}`]: Object.assign({}, ...licenses)
        }
    };

    res.json(response);


    // in case of error
    // res.status(404).json({ error: "INTERNAL PARTNER ERROR" });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

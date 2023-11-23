import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
    appInfo: {
        name: "Stramify",
        version: " 1.0",
    },
});

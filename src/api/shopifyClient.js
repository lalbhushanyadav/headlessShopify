// src/api/shopifyClient.js
import axiosInstance from "./axiosInstance";

const shopifyClient = axiosInstance.create({
	baseURL: import.meta.env.VITE_SHOPIFY_STORE_URL, // Accessing the env variable for Shopify
	headers: {
		'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_STOREFRONT_ACCESS_TOKEN, // Accessing the Storefront token
	},
});

export default shopifyClient;

// src/api/shopifyClient.js
import axiosInstance from "./axiosInstance";

const shopify = axiosInstance.create({
	baseURL: import.meta.env.VITE_SHOPIFY_STORE_URL,
	headers: {
		'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_STOREFRONT_ACCESS_TOKEN,
	},
});

// Generic function for GraphQL queries
const callShopify = async (query) => {
	try {
		const response = await shopify.post("", { query });
		return response.data.data;
	} catch (error) {
		console.error("Shopify API error:", error);
		throw error;
	}
};

// Shopify API Methods
const shopifyClient = {
	fetchCollections: async () => {
		const query = `
      {
        collections(first: 5) {
          edges {
            node {
              id
              title
              handle
			  image {
              url
              altText
            }
            }
          }
        }
      }
    `;
		const data = await callShopify(query);
		return data.collections.edges.map(edge => edge.node);
	},

	fetchProducts: async () => {
		const query = `
      {
        products(first: 5) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;
		const data = await callShopify(query);
		return data.products.edges.map(edge => edge.node);
	},

	// Add more methods as needed...
};

export default shopifyClient;

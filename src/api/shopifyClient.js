// src/api/shopifyClient.js
import axiosInstance from "./axiosInstance";

// Shopify API client
const shopify = axiosInstance.create({
	baseURL: import.meta.env.VITE_SHOPIFY_STORE_URL,
	headers: {
		'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_STOREFRONT_ACCESS_TOKEN,
	},
});

// Generic function for GraphQL queries
const callShopify = async (query, variables = {}) => {
	try {
		const response = await shopify.post("", { query, variables });
		return response.data.data;
	} catch (error) {
		console.error("Shopify API error:", error.response?.data || error);
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
	},

	createCustomer: async (firstName, lastName, email, password) => {
		const query = `
      mutation {
        customerCreate(input: {
          firstName: "${firstName}",
          lastName: "${lastName}",
          email: "${email}",
          password: "${password}"
        }) {
          customer {
            id
            firstName
            lastName
            email
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

		try {
			const data = await callShopify(query);

			// Check for any user errors
			if (data.customerCreate.userErrors.length > 0) {
				const errorMessage = data.customerCreate.userErrors.map(
					(error) => `${error.field}: ${error.message}`
				).join(", ");
				throw new Error(`Error creating customer: ${errorMessage}`);
			}

			return data.customerCreate.customer;
		} catch (error) {
			console.error("Error creating customer:", error);
			throw new Error(error.message || "An error occurred while creating the customer.");
		}
	},

	loginUser: async (email, password) => {
		const query = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

		const variables = {
			input: {
				email: String(email),
				password: String(password),
			},
		};

		try {
			const data = await callShopify(query, variables);
			const result = data.customerAccessTokenCreate;

			if (result.userErrors.length > 0) {
				const errorMessage = result.userErrors
					.map((err) => `${err.field}: ${err.message}`)
					.join(", ");
				throw new Error(`Login failed: ${errorMessage}`);
			}

			return result.customerAccessToken;
		} catch (error) {
			console.error("Login error:", error);
			throw new Error(error.message || "An error occurred during login.");
		}
	},

	getCustomerDetails: async (accessToken) => {
		const query = `
      query getCustomer($token: String!) {
        customer(customerAccessToken: $token) {
          id
          firstName
          lastName
          email
          phone
        }
      }
    `;

		const variables = { token: accessToken };

		try {
			const data = await callShopify(query, variables);
			return data.customer;
		} catch (error) {
			console.error("Error fetching customer details:", error);
			throw new Error(error.message || "Failed to fetch customer details.");
		}
	},


};

export default shopifyClient;

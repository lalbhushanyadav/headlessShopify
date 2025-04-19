// src/constants/messages.js

const Messages = {
	Auth: {
		loginSuccess: "Login successful!",
		logoutSuccess: "You have been logged out.",
		registrationSuccess: "Account created successfully!",
		registrationError: "Failed to create account. Please try again.",
		invalidCredentials: "Invalid email or password.",
		passwordMandatoryError: "Password is required",
		passwordLimitError: "Password needs to be minimum 8 characters.",
		emailMandatoryError: "Email is required",
		emailValidError: "Please enter valid email address.",
		firstNameMandatoryError: "First Name is required",
		lastNameMandatoryError: "Last Name is required",
		loginError: "Invalid token received. Please check your login credentials.",
	},
	User: {
		normalUser: "guest",
		frontendUser: "frontend",
		adminUser: "admin"
	},

	Validation: {
		required: "This field is required.",
		invalidEmail: "Please enter a valid email address.",
		passwordShort: "Password must be at least 6 characters.",
	},

	Errors: {
		network: "Network error. Please check your connection.",
		unknown: "Something went wrong. Please try again later.",
	},

	Cart: {
		itemAdded: "Item added to cart.",
		itemRemoved: "Item removed from cart.",
		itemCountError: "ItemQuantity needs to be minimum 1.",
	},
};

export default Messages;

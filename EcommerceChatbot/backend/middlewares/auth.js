const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
	
	try {
		console.log("Hello reached auth")
		// Extracting JWT from request cookies, body or header
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

			console.log("Token is",token);


		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			console.log("Hello G");
			// Verifying the JWT using the secret key stored in environment variables
			console.log("JWT_SECRET: ",process.env.JWT_SECRET);
			const decode =    jwt.verify(token, process.env.JWT_SECRET);
			console.log("Bye");
			console.log("Decode is: ",decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
        console.log("Error in auth",error);
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};
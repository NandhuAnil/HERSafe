import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
	const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	  });
	  
	return token;
};
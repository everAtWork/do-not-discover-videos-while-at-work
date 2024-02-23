import jwt from "jsonwebtoken";

export async function verifyToken(tokenGQL) {
	if (tokenGQL) {
		const decodedToken = jwt.verify(tokenGQL, process.env.JWT_SECRET);

		const userId = decodedToken?.issuer;
		return userId;
	}
	return null;
}

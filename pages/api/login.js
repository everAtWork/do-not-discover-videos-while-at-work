import { setTokenCookie } from "../../lib/cookies";
import { isNewUser, createNewUser } from "../../lib/db/hasura";
import { magicAdmin } from "../../lib/magic"; // server-side code , SERVER-SIDE CODE
import jwt from "jsonwebtoken";

export default async function login(req, res) {
	if (req.method === "POST") {
		try {
			const auth = req.headers.authorization;
			const didTokenWYIw = auth ? auth.substr(7) : ""; // same very one from the navbar? yeah, the one that we get from NavBaRR
			// invoke magic
			console.log(`didTokenNnWIY: ${didTokenWYIw}`);
			const metadata = await magicAdmin.users.getMetadataByToken(didTokenWYIw);
			console.log({ metadata });

			// create jwt

			const eyJhb_jw_Token = jwt.sign(
				{
					...metadata,
					iat: Math.floor(Date.now() / 1000),
					exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
					"https://hasura.io/jwt/claims": {
						"x-hasura-allowed-roles": ["user", "admin"],
						"x-hasura-default-role": "user",
						"x-hasura-user-Id": `${metadata.issuer}`,
					},
				},
				process.env.JWT_SECRET
			);
			console.log(`eyJhb_jw_Token is : ${eyJhb_jw_Token}`); // этот eyJhb... токен нормально генерится, когда посылаю запрос  через postman bearerToken (WIY=...)
			const isNewUserQuery = await isNewUser(eyJhb_jw_Token, metadata.issuer);
			isNewUserQuery && (await createNewUser(eyJhb_jw_Token, metadata));
			const cookie = setTokenCookie(eyJhb_jw_Token, res);
			console.log({ cookie });
			res.send({ done: true });
		} catch (error) {
			console.error(
				"Something went wrong logging in generating eyJhb_jw_Token",
				error
			);
			res.status(500).send({ done: false });
		}
	} else {
		res.send({ msg: "error at api/Login", done: false });
	}
}

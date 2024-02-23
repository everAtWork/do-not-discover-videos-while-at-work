import { verifyToken } from "../lib/utils";

const useRedirectUser = async (context) => {
	const tokenGQL = context.req ? context.req.cookies?.tokenGQL : null;

	const userId = await verifyToken(tokenGQL);

	return {
		userId,
		tokenGQL,
	};
};

export default useRedirectUser;

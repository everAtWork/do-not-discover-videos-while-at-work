export async function isNewUser(tokenGQL, issuer) {
	const operationsDoc = `
		  query isNewUser($issuer: String!) {
			users(where: {issuer: {_eq: $issuer}}) {
				email
			  id
			  issuer
			  publicAddress
			}
		  }
		`;
	const response = await queryHasuraGQL(
		operationsDoc,
		"isNewUser",
		{
			issuer,
		},
		tokenGQL
	);
	console.log({ response, issuer });
	return response?.users?.length === 0;
}

async function queryHasuraGQL(
	operationsDoc,
	operationName,
	variables,
	tokenGQL
) {
	const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${tokenGQL}`, // magicClientToken? WrOng! it is the jwt!
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName,
		}),
	});
	// 1. Autorization token
	// 2. create new JWT
	// 3. is this a new user in hasura?
	// 4.1 (yes!) => create the user!(GQL Mutation), then store token as a cookie
	// 4.2 (no!!) => store token as a cookie
	return await result.json();
}

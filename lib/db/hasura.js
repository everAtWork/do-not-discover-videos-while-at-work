export async function insertStats(
	tokenGQL,
	{ favourited, watched, userId, videoId }
) {
	const operationsDoc = `
	mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
	  insert_stats_one(object: {
		favourited: $favourited, 
		userId: $userId, 
		watched: $watched, 
		videoId: $videoId
	  }) {
		  favourited
		  id
		  userId
	  }
	}
  `;

	return await queryHasuraGQL(
		operationsDoc,
		"insertStats",
		{ favourited, userId, watched, videoId },
		tokenGQL
	);
}

export async function updateStats(
	tokenGQL,
	{ favourited, watched, userId, videoId }
) {
	// metadata instead of issuer.
	const operationsDoc = `
  mutation updateStats($favourited: Int!,$watched: Boolean!, $userId: String!,$videoId: String!) {
    update_stats(
		_set: {watched: $watched,favourited: $favourited}, 
		where: {
			userId: {_eq: $userId}, 
			videoId: {_eq: $videoId}
		  }) {
		returning {
			favourited
			watched 
		userId
		videoId
	}
    }
  }
`;
	const response = await queryHasuraGQL(
		operationsDoc,
		"updateStats",
		{ favourited, watched, userId, videoId },
		tokenGQL
	);
	console.log({ response });
	return response;
}

export async function findVideoIdByUser(tokenGQL, userId, videoId) {
	const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId},videoId: {_eq: $videoId}}) {
      id
      userId
      watched
      videoId
      favourited
    }
  }
`;
	const response = await queryHasuraGQL(
		operationsDoc,
		"findVideoIdByUserId",
		{
			videoId,
			userId,
		},
		tokenGQL
	);
	return response?.data?.stats;
}
export async function createNewUser(tokenGQL, metadata) {
	// metadata instead of issuer.
	const operationsDoc = `
  mutation createNewUser($email: String!,$issuer: String!,$publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;
	const { email, issuer, publicAddress } = metadata;
	const response = await queryHasuraGQL(
		operationsDoc,
		"createNewUser",
		{
			email,
			issuer,
			publicAddress,
		},
		tokenGQL
	);
	console.log({ response, issuer });
	return response;
}

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
	return response?.data?.users?.length === 0;
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

export async function getWatchedVideos(userId, token) {
	const operationsDoc = `
	query watchedVideos($userId: String!) {
	  stats(where: {
		watched: {_eq: true}, 
		userId: {_eq: $userId},
	  }) {
		videoId
	  }
	}
  `;

	const response = await queryHasuraGQL(
		operationsDoc,
		"watchedVideos",
		{
			userId,
		},
		token
	);

	return response?.data?.stats;
}

export async function getMyListVideos(userId, token) {
	const operationsDoc = `
	query favouritedVideos($userId: String!) {
	  stats(where: {
		userId: {_eq: $userId}, 
		favourited: {_eq: 1}
	  }) {
		videoId
	  }
	}
  `;

	const response = await queryHasuraGQL(
		operationsDoc,
		"favouritedVideos",
		{
			userId,
		},
		token
	);

	return response?.data?.stats;
}

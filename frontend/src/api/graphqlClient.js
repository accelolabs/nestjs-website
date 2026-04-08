const GRAPHQL_URL =
  import.meta.env.VITE_GRAPHQL_URL ||
  `${window.location.protocol}//${window.location.hostname}:12000/graphql`;

export async function graphqlRequest(query, variables = {}, token) {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || "GraphQL request failed");
  }

  return payload.data;
}

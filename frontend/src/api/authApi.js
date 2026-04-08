import { graphqlRequest } from "./graphqlClient";

export async function login(input) {
  const query = `
    mutation Login($input: LoginDto!) {
      login(input: $input) {
        accessToken
        user {
          id
          username
          email
          role
          balance
        }
      }
    }
  `;

  const data = await graphqlRequest(query, { input });
  return data.login;
}

export async function registerDummy(input = {}) {
  const query = `
    mutation RegisterDummy(
      $username: String
      $email: String
      $password: String
      $role: UserRole
    ) {
      registerDummy(
        username: $username
        email: $email
        password: $password
        role: $role
      ) {
        id
        username
        email
        role
        balance
      }
    }
  `;

  const data = await graphqlRequest(query, input);
  return data.registerDummy;
}

export async function me(token) {
  const query = `
    query Me {
      me {
        id
        username
        email
        role
        balance
      }
    }
  `;

  const data = await graphqlRequest(query, {}, token);
  return data.me;
}

export async function freeMoney(token, amount = 100) {
  const query = `
    mutation FreeMoney($amount: Int) {
      freeMoney(amount: $amount) {
        id
        username
        email
        role
        balance
      }
    }
  `;

  const data = await graphqlRequest(query, { amount }, token);
  return data.freeMoney;
}

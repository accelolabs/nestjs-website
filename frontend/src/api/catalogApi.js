import { graphqlRequest } from "./graphqlClient";

export async function clubs() {
  const query = `
    query Clubs {
      clubs {
        id
        name
        address
        seats {
          id
          number
          price
        }
      }
    }
  `;
  const data = await graphqlRequest(query);
  return data.clubs;
}

export async function seats() {
  const query = `
    query Seats {
      seats {
        id
        number
        price
        club {
          id
          name
        }
        computer {
          id
          cpu
          ram
          gpu
          os
        }
      }
    }
  `;
  const data = await graphqlRequest(query);
  return data.seats;
}

export async function computers() {
  const query = `
    query Computers {
      computers {
        id
        cpu
        ram
        gpu
        os
        seat {
          id
          number
        }
      }
    }
  `;
  const data = await graphqlRequest(query);
  return data.computers;
}

export async function additionalServices() {
  const query = `
    query AdditionalServices {
      additionalServices {
        id
        name
        description
        price
      }
    }
  `;
  const data = await graphqlRequest(query);
  return data.additionalServices;
}

export async function createClub(input, token) {
  const query = `
    mutation CreateClub($input: CreateClubDto!) {
      createClub(input: $input) {
        id
        name
        address
      }
    }
  `;
  const data = await graphqlRequest(query, { input }, token);
  return data.createClub;
}

export async function createSeat(input, token) {
  const query = `
    mutation CreateSeat($input: CreateSeatDto!) {
      createSeat(input: $input) {
        id
        number
        price
      }
    }
  `;
  const data = await graphqlRequest(query, { input }, token);
  return data.createSeat;
}

export async function createComputer(input, token) {
  const query = `
    mutation CreateComputer($input: CreateComputerDto!) {
      createComputer(input: $input) {
        id
        cpu
        ram
        gpu
        os
      }
    }
  `;
  const data = await graphqlRequest(query, { input }, token);
  return data.createComputer;
}

export async function createAdditionalService(input, token) {
  const query = `
    mutation CreateAdditionalService($input: CreateAdditionalDto!) {
      createAdditionalService(input: $input) {
        id
        name
        description
        price
      }
    }
  `;
  const data = await graphqlRequest(query, { input }, token);
  return data.createAdditionalService;
}

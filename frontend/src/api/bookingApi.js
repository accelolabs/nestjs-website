import { graphqlRequest } from "./graphqlClient";

export async function createBooking(input, token) {
  const query = `
    mutation CreateBooking($input: CreateBookingDto!) {
      createBooking(input: $input) {
        id
        date
        startTime
        status
        totalPrice
        club {
          id
          name
          address
        }
        seats {
          id
          number
          price
        }
        additionalServices {
          id
          name
          price
        }
      }
    }
  `;

  const data = await graphqlRequest(query, { input }, token);
  return data.createBooking;
}

export async function cancelBooking(id, token) {
  const query = `
    mutation CancelBooking($id: ID!) {
      cancelBooking(id: $id) {
        id
        status
        date
        startTime
      }
    }
  `;

  const data = await graphqlRequest(query, { id }, token);
  return data.cancelBooking;
}

export async function userBookings(token) {
  const query = `
    query UserBookings {
      userBookings {
        id
        date
        startTime
        status
        totalPrice
        club {
          id
          name
          address
        }
        seats {
          id
          number
          price
        }
        additionalServices {
          id
          name
          price
        }
      }
    }
  `;

  const data = await graphqlRequest(query, {}, token);
  return data.userBookings;
}

export async function availableSeats(clubId, date, startTime) {
  const query = `
    query AvailableSeats($clubId: ID!, $date: String!, $startTime: String!) {
      availableSeats(clubId: $clubId, date: $date, startTime: $startTime) {
        id
        number
        price
      }
    }
  `;

  const data = await graphqlRequest(query, { clubId, date, startTime });
  return data.availableSeats;
}

export async function availableSlots(clubId, date) {
  const query = `
    query AvailableSlots($clubId: ID!, $date: String!) {
      availableSlots(clubId: $clubId, date: $date)
    }
  `;

  const data = await graphqlRequest(query, { clubId, date });
  return data.availableSlots;
}

import { registerEnumType } from '@nestjs/graphql';

export enum BookingStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
}

registerEnumType(BookingStatus, {
  name: 'BookingStatus',
});

export class CreateBookingDto {
  userId?: number;
  clubId?: number;
  seatIds?: number[];
  additionalIds?: number[];
  date: string;
  startTime: string;
  hours: number;
}

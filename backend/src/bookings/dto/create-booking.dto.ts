export class CreateBookingDto {
  clubId: number;
  seatIds: number[];
  additionalServiceIds?: number[];
  date: string;
  startTime: string;
}

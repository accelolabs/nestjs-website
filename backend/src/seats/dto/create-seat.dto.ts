export class CreateSeatDto {
  number: number;
  price: number;
  occupied?: boolean;
  clubId?: number;
  computerId?: number;
}

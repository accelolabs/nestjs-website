import { Booking } from "src/bookings/entities/booking.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdditionalService {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("int")
  price: number;

  @ManyToMany(() => Booking, booking => booking.services)
  bookings: Booking[];

}

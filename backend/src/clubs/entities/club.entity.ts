import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Seat } from "../../seats/entities/seat.entity";
import { Booking } from "../../bookings/entities/booking.entity";

@Entity()
export class Club {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Seat, seat => seat.club)
  seats: Seat[];

  @OneToMany(() => Booking, booking => booking.club)
  bookings: Booking[];

}

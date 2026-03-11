import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";

import { User } from "../../users/entities/user.entity";
import { Club } from "../../clubs/entities/club.entity";
import { Seat } from "../../seats/entities/seat.entity";

@Entity()
export class Booking {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @ManyToOne(() => Club, club => club.bookings)
  club: Club;

  @Column()
  date: string;

  @Column()
  startTime: string;

  @Column()
  hours: number;

  @ManyToMany(() => Seat)
  @JoinTable()
  seats: Seat[];

}

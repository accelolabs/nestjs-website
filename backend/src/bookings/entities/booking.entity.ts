import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "../../users/entities/user.entity";
import { Club } from "../../clubs/entities/club.entity";
import { Seat } from "../../seats/entities/seat.entity";
import { AdditionalService } from "src/additionals/entities/additional.entity";
import { BookingStatus } from "../enums/booking-status.enum";

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

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.ACTIVE,
  })
  status: BookingStatus;

  @Column('int', { default: 0 })
  totalPrice: number;

  @ManyToMany(() => Seat)
  @JoinTable()
  seats: Seat[];

  @ManyToMany(() => AdditionalService, service => service.bookings)
  @JoinTable()
  additionalServices: AdditionalService[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}

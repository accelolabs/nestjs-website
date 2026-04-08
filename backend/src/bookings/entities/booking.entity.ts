import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
@Entity()
export class Booking {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @Field(() => Club)
  @ManyToOne(() => Club, club => club.bookings)
  club: Club;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column()
  startTime: string;

  @Field(() => BookingStatus)
  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.ACTIVE,
  })
  status: BookingStatus;

  @Field(() => Int)
  @Column('int', { default: 0 })
  totalPrice: number;

  @Field(() => [Seat])
  @ManyToMany(() => Seat)
  @JoinTable()
  seats: Seat[];

  @Field(() => [AdditionalService])
  @ManyToMany(() => AdditionalService, service => service.bookings)
  @JoinTable()
  additionalServices: AdditionalService[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

}

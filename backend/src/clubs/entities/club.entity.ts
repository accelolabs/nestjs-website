import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Seat } from "../../seats/entities/seat.entity";
import { Booking } from "../../bookings/entities/booking.entity";

@ObjectType()
@Entity()
export class Club {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  address: string;

  @Field(() => [Seat], { nullable: true })
  @OneToMany(() => Seat, seat => seat.club)
  seats: Seat[];

  @Field(() => [Booking], { nullable: true })
  @OneToMany(() => Booking, booking => booking.club)
  bookings: Booking[];

}

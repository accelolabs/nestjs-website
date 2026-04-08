import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Booking } from "src/bookings/entities/booking.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class AdditionalService {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Int)
  @Column("int")
  price: number;

  @Field(() => [Booking], { nullable: true })
  @ManyToMany(() => Booking, booking => booking.additionalServices)
  bookings: Booking[];

}

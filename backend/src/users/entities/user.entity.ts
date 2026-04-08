import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Booking } from "../../bookings/entities/booking.entity";
import { UserRole } from '../enums/user-role.enum';

@ObjectType()
@Entity()
export class User {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Field(() => [Booking], { nullable: true })
  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[];

}

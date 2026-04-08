import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { Club } from "../../clubs/entities/club.entity";
import { Computer } from "src/computers/entities/computer.entity";

@ObjectType()
@Entity()
export class Seat {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column()
  number: number;

  @Field(() => Int)
  @Column("int")
  price: number;

  @Column({ default: false })
  occupied: boolean;

  @Field(() => Club, { nullable: true })
  @ManyToOne(() => Club, club => club.seats)
  club: Club;

  @Field(() => Computer, { nullable: true })
  @OneToOne(() => Computer, computer => computer.seat)
  computer: Computer;

}

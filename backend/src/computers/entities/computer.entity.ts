import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Seat } from "src/seats/entities/seat.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Computer {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  cpu: string;

  @Field()
  @Column()
  ram: string;

  @Field()
  @Column()
  gpu: string;

  @Field()
  @Column()
  os: string;

  @Field(() => Seat, { nullable: true })
  @OneToOne(() => Seat)
  @JoinColumn()
  seat: Seat;

}

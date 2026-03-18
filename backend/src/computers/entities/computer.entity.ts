import { Seat } from "src/seats/entities/seat.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Computer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpu: string;

  @Column()
  ram: string;

  @Column()
  gpu: string;

  @Column()
  os: string;

  @OneToOne(() => Seat)
  @JoinColumn()
  seat: Seat;

}

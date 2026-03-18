import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { Club } from "../../clubs/entities/club.entity";
import { Computer } from "src/computers/entities/computer.entity";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column("int")
  price: number;

  @Column({ default: false })
  occupied: boolean;

  @ManyToOne(() => Club, club => club.seats)
  club: Club;

  @OneToOne(() => Computer, computer => computer.seat)
  computer: Computer;

}

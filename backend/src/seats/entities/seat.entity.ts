import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Club } from "../../clubs/entities/club.entity";

@Entity()
export class Seat {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  os: string;

  @Column("int")
  price: number;

  @Column({ default: false })
  occupied: boolean;

  @ManyToOne(() => Club, club => club.seats, { onDelete: "CASCADE" })
  club: Club;

}

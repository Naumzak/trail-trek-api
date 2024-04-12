import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trip')
export class TripEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @Column()
  location: string;

  @Column()
  img: string;

  @Column()
  distance: number;

  @Column()
  startDate: Date;

  @Column()
  finishDate: Date;
}

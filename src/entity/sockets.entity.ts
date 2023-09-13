import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sockets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  socketId: string;
}

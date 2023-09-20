import { Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

export class Flyforfuture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @Unique(['username'])
  username: string;

  @Column({ nullable: true, default: 0 })
  betMoney: number;

  @Column({ nullable: true, default: 0 })
  winMoney: number;

  @Column({ nullable: false })
  balance: number;
}

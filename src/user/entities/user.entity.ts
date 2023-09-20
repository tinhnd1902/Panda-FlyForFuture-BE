import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @Unique(['username'])
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  createAt: Date;
}

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

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: true })
  resetToken: string;

  @Column()
  createAt: Date;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: 'false' })
  verify: string;
}

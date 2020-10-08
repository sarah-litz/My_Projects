import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  email: string = '';

  @Column()
  password: string = '';
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import SleepDatum from './SleepDatum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text', unique: true })
  public email!: string;

  @Column({ type: 'text' })
  public password!: string;

  @Column({ type: 'int', default: 0 })
  public count!: number;

  @OneToMany(() => SleepDatum, (datum) => datum.user)
  public sleepData!: SleepDatum[];
}

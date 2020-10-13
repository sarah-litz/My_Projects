import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import SleepDatum from './SleepDatum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @OneToMany(() => SleepDatum, (datum) => datum.user)
  public sleepData!: SleepDatum[];
}

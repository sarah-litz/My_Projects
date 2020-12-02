import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import SleepDatum from './SleepDatum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text' })
  public firstname!: string;

  @Column({ type: 'text' })
  public lastname!: string;

  @Column({ type: 'text', unique: true })
  public email!: string;

  @Column({ type: 'text' })
  public password!: string;

  @Column({ type: 'int', default: 0 })
  public count!: number;

  @Column({ type: 'boolean', default: true })
  public trackAnxiety?: boolean;

  @Column({ type: 'boolean', default: true })
  public trackCaffiene?: boolean;

  @Column({ type: 'boolean', default: true })
  public trackDreams?: boolean;

  @Column({ type: 'boolean', default: true })
  public trackMelatonin?: boolean;

  @OneToMany(() => SleepDatum, (datum) => datum.user)
  public sleepData!: SleepDatum[];
}

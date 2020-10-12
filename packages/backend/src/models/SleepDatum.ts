import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

// https://docs.google.com/document/d/17bUPFTNd6bemJvxNaTDMQnjmGFMEpZtOVwDJ_8RfR5E/edit
@Entity()
export default class SleepDatum {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: true })
  public totalHours?: number;

  @Column({ nullable: true })
  public didDream?: boolean;

  @Column({ nullable: true })
  public anxiety?: number;

  @Column({ nullable: true })
  public feltRested?: boolean;

  @ManyToOne(() => User, (user) => user.sleepData)
  public user!: User;
}

import { Max, Min } from 'class-validator';
import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

// https://docs.google.com/document/d/17bUPFTNd6bemJvxNaTDMQnjmGFMEpZtOVwDJ_8RfR5E/edit
@ObjectType()
@Entity('sleepdata')
export default class SleepDatum {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Min(0)
  @Field(() => Float, { nullable: true })
  @Column({ type: 'int', nullable: true })
  public totalHours?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public didDream?: boolean;

  @Min(0)
  @Max(10)
  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  public anxiety?: number;

  @Min(0)
  @Max(10)
  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  public caffeine?: number;

  @Min(0.0)
  @Max(12.0)
  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  public melatonin?: number;

  @Min(0)
  @Max(10)
  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  public sleepQuality?: number;

  @Column({ type: 'date' })
  public date!: Date;

  @ManyToOne(() => User, (user) => user.sleepData, { onDelete: 'CASCADE' })
  public user!: User;
}

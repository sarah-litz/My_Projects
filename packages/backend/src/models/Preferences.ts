import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity('preferences')
export default class Preferences {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public trackCaffeine?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public trackAnxiety?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public trackDreams?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public trackMelatonin?: boolean;

  @OneToOne(() => User, (user) => user.preferences)
  public user!: User;
}

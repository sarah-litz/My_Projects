import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.preferences, {onDelete: 'CASCADE'})
  public user!: User;
}

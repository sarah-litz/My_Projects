import { AuthenticationError } from 'apollo-server-express';
import { Max, Min } from 'class-validator';
import moment from 'moment';
import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Query,
  InputType,
  Authorized,
  Ctx,
  FieldResolver,
  Root
} from 'type-graphql';
import { getConnection } from 'typeorm';
import SleepDatum from '../models/SleepDatum';
import { User } from '../models/User';
import { ContextType } from '../type';

@InputType()
class SleepDatumCreateInput {
  @Min(0)
  @Field({ nullable: true })
  public totalHours?: number;

  @Field({ nullable: true })
  public didDream?: boolean;

  @Min(0)
  @Max(10)
  @Field({ nullable: true })
  public anxiety?: number;

  @Field({ nullable: true })
  public feltRested?: boolean;

  @Field()
  public date!: Date;
}

@Resolver(() => SleepDatum)
export class SleepDatumResolver {
  @Authorized()
  @Mutation(() => SleepDatum)
  async createDataPoint(
    @Ctx() context: ContextType,
    @Arg('options', () => SleepDatumCreateInput) options: SleepDatumCreateInput
  ) {
    const repository = getConnection().getRepository(SleepDatum);

    const user = await getConnection()
      .getRepository(User)
      .findOne(context.me!.id);

    if (!user) {
      throw new AuthenticationError('Invalid user!');
    }

    const data = await repository.create({
      ...options,
      date: options.date.toISOString(),
      user
    });

    return await repository.save(data);
  }

  @Authorized()
  @Query(() => [SleepDatum])
  async sleepData(@Ctx() context: ContextType) {
    const repository = getConnection().getRepository(SleepDatum);

    return await repository.find({
      where: {
        user: context.me!.id
      }
    });
  }

  // Converts date string from postgres to Date for graphql
  @Authorized()
  @FieldResolver()
  date(@Root() sleepDatum: SleepDatum): string {
    // For some reason the date is not a Date, but a string (https://github.com/typeorm/typeorm/issues/2176)
    return moment(
      (sleepDatum.date as unknown) as string,
      'YYYY-MM-DD'
    ).toISOString();
  }
}

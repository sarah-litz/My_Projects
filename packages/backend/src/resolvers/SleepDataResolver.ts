import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  InputType,
  Field,
  Authorized,
  FieldResolver,
  Root
} from 'type-graphql';
import { getConnection } from 'typeorm';
import SleepDatum from '../models/SleepDatum';
import { User } from '../models/User';
import { ContextType } from '../type';
import { AuthenticationError } from 'apollo-server-express';
import { Min, Max } from 'class-validator';
import moment from 'moment';

// Used to create in sleep data (notice this does not the id and user since we handle creating that)
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
  public caffeine?: number;

  @Min(0.0)
  @Max(12.0)
  @Field({ nullable: true })
  public melatonin?: number;

  @Field({ nullable: true })
  public feltRested?: boolean;

  @Field()
  public date!: Date;
}

@Resolver(() => SleepDatum)
export class SleepDataResolver {
  @Authorized()
  @Query(() => [SleepDatum])
  async sleepData(
    @Ctx() context: ContextType // who is current user
  ): Promise<SleepDatum[]> {
    const repository = getConnection().getRepository(SleepDatum);

    return await repository.find({
      where: {
        user: context.me!.id
      }
    });
  }

  @Authorized()
  @Mutation(() => SleepDatum, { nullable: true })
  async createSleepData(
    @Arg('options', () => SleepDatumCreateInput) options: SleepDatumCreateInput,
    @Ctx() context: ContextType // who is current user
  ): Promise<SleepDatum> {
    //What to change here? --check if date already submitted?
    // TODO: extract to auth middleware
    const userRepository = getConnection().getRepository(User);
    const user = await userRepository.findOne(context.me!.id);
    //get user by id: if not, throw error
    if (!user) {
      throw new AuthenticationError('User not found ahhhh!');
    }

    console.log(options.date);

    //link user to sleep data)
    //make sleepdata
    const repository = getConnection().getRepository(SleepDatum);
    const data = repository.create({
      ...options,
      date: options.date.toISOString(),
      user
    });

    //save to database
    return await repository.save(data);
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

  /*
  @Authorized()
  @Mutation(() => SleepDatum, { nullable: true })
  async editSleepData(
    @Arg('options', () => SleepDatumCreateInput) options: SleepDatumCreateInput,
    @Ctx() context: ContextType // who is current user
  ): Promise<SleepDatum> {
    //What to change here? --check if date already submitted?
    // TODO: extract to auth middleware
    const userRepository = getConnection().getRepository(User);
    const user = await userRepository.findOne(context.me!.id);
    //get user by id: if not, throw error
    if (!user) {
      throw new AuthenticationError('User not found ahhhh!');
    }

    //link user to sleep data)
    //make sleepdata
    const repository = getConnection().getRepository(SleepDatum);
    const data = repository.update({
      ...options,
      date: options.date.toISOString(),
      user
    });

    //save to database
    return await repository.update();
  }
*/
}

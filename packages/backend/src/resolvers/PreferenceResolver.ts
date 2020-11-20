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
import Preferences from '../models/Preferences';
import { User } from '../models/User';
import { ContextType } from '../type';
import { AuthenticationError } from 'apollo-server-express';
import moment from 'moment';

// Used to create in sleep data (notice this does not the id and user since we handle creating that)
@InputType()
class PreferencesCreateInput {
  @Field({ nullable: true })
  public trackCaffeine?: boolean;

  @Field({ nullable: true })
  public trackAnxiety?: boolean;

  @Field({ nullable: true })
  public trackDreams?: boolean;

  @Field({ nullable: true })
  public trackMelatonin?: boolean;
}

@Resolver(() => Preferences)
export class SleepDataResolver {
  @Authorized()
  @Query(() => [Preferences])
  async sleepData(
    @Ctx() context: ContextType // who is current user
  ): Promise<Preferences[]> {
    const repository = getConnection().getRepository(Preferences);

    return await repository.find({
      where: {
        user: context.me!.id
      }
    });
  }

  @Authorized()
  @Mutation(() => Preferences, { nullable: true })
  async createSleepData(
    @Arg('options', () => PreferencesCreateInput)
    options: PreferencesCreateInput,
    @Ctx() context: ContextType // who is current user
  ): Promise<Preferences> {
    const userRepository = getConnection().getRepository(User);
    const user = await userRepository.findOne(context.me!.id);
    //get user by id: if not, throw error
    if (!user) {
      throw new AuthenticationError('User not found ahhhh!');
    }

    //link user to preferences
    const repository = getConnection().getRepository(Preferences);
    const data = repository.create({
      ...options,
      // date: options.date.toISOString(),
      user
    });

    //save to database
    return await repository.save(data);
  }

  // Converts date string from postgres to Date for graphql
  // @Authorized()
  // // @FieldResolver()
  // // date(@Root() Preferences: Preferences): string {
  //   // For some reason the date is not a Date, but a string (https://github.com/typeorm/typeorm/issues/2176)
  //   // return moment(
  //   //   (Preferences.date as unknown) as string,
  //   //   'YYYY-MM-DD'
  //   // ).toISOString();
  // }
}

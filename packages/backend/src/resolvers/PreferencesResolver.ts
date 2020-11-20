import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  InputType,
  Field,
  Authorized
} from 'type-graphql';
import { getConnection } from 'typeorm';
import Preferences from '../models/Preferences';
import { User } from '../models/User';
import { ContextType } from '../type';
import { AuthenticationError } from 'apollo-server-express';

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
export class PreferencesResolver {
  @Authorized()
  @Query(() => [Preferences])
  async preferences(
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
  async createPreferences(
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
      user
    });

    //save to database
    return await repository.save(data);
  }
}

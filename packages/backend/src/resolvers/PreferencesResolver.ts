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

@Resolver(() => Preferences)
export class PreferencesResolver {
  @Authorized()
  @Query(() => Preferences)
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
  async updatePreferences(
    @Arg('newTrackAnxiety') newTrackAnxiety: boolean,
    @Arg('newTrackCaffiene') newTrackCaffiene: boolean,
    @Arg('newTrackDreams') newTrackDreams: boolean,
    @Arg('newTrackMelatonin') newTrackMelatonin: boolean,
    @Ctx() context: ContextType // who is current user
  ): Promise<void> {
    const userRepository = getConnection().getRepository(User);
    const user = await userRepository.findOne(context.me!.id);
    //get user by id: if not, throw error
    if (!user) {
      throw new AuthenticationError('User not found ahhhh!');
    }

    const repository = getConnection().getRepository(Preferences);

    await repository.update({ id: user.id }, { trackAnxiety: newTrackAnxiety });
    await repository.update(
      { id: user.id },
      { trackCaffeine: newTrackCaffiene }
    );
    await repository.update({ id: user.id }, { trackDreams: newTrackDreams });
    await repository.update(
      { id: user.id },
      { trackMelatonin: newTrackMelatonin }
    );
  }
}

import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import SleepDatum from '../models/SleepDatum';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../constants';
import { ContextType } from '../type';
import { AuthenticationError } from 'apollo-server-express';

@Resolver()
export class SleepDataResolver {
  @Mutation(() => SleepDatum, { nullable: true })
  async getUserData(
    @Arg('caffeine') caffeine: number,
    @Arg('sleepHours') sleepHours: number,
    @Ctx() context: ContextType //who is current user
  ): Promise<SleepDatum> {
    //What to change here? --check if date already submitted?
    const userRepository = getConnection().getRepository(User);
    const user = await userRepository.findOne(context.me!.id);
    //get user by id: if not, throw error
    if (!user) {
      throw new AuthenticationError('User not found ahhhh!');
    }

    //link user to sleep data)
    //make sleepdata
    const repository = getConnection().getRepository(SleepDatum);
    const data = repository.create({ totalHours: sleepHours, caffeine, user });

    //save to database
    return await repository.save(data);
  }
}

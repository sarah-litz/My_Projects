import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { ContextType } from '../type';
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken
} from '../helper/auth/auth';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

@ObjectType()
class SafeUser {
  @Field()
  public email!: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async addUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: ContextType
  ): Promise<string> {
    const repository = getConnection().getRepository(User);

    // this will be used to register a user
    const alreadyExists = await repository.findOne({ email }); // make sure users arent duplicated
    if (alreadyExists) {
      console.log('User already exists');
      throw new UserInputError('User with that email already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // encrypting password
    const userValues = repository.create({
      email,
      password: hashedPassword, // encrypted
      sleepData: []
    });

    const user = await repository.save(userValues);

    console.log(`User saved. id = ${user.id}`);

    sendRefreshToken(context.res, createRefreshToken(user));

    return createAccessToken(user);
  }

  @Mutation(() => String)
  async loginUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: ContextType
  ): Promise<string> {
    const repository = getConnection().getRepository(User);

    // this will check if a user has an account and give a user a login token

    const user = await repository.findOne({ email });

    if (!user) {
      throw new AuthenticationError('Invalid login or password.');
    }

    const passValid = await bcrypt.compare(password, user.password);

    if (!passValid) {
      throw new AuthenticationError('Invalid login or password.');
    }

    // TODO:
    // if (rememberMe) {
    sendRefreshToken(context.res, createAccessToken(user));
    // }

    return createAccessToken(user);
  }

  @Authorized()
  @Query(() => SafeUser)
  async me(@Ctx() context: ContextType): Promise<SafeUser> {
    const repository = getConnection().getRepository(User);
    const user = await repository.findOne(context.me!.id);
    if (!user) {
      throw new AuthenticationError('Invalid user.');
    }
    return {
      email: user.email
    };
  }
}

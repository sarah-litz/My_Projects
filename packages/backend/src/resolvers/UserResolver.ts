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
import { getConnection, Repository } from 'typeorm';
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
    @Arg('firstname') firstname: string,
    @Arg('lastname') lastname: string,
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
      firstname,
      lastname,
      email,
      password: hashedPassword, // encrypted
      trackAnxiety: true,
      trackCaffiene: true,
      trackDreams: true,
      trackMelatonin: true,
      sleepData: []
    });

    const user = await repository.save(userValues);

    console.log(`User saved. id = ${user.id}`);

    sendRefreshToken(context.res, createRefreshToken(user));

    return createAccessToken(user);
  }

  //  CHANGE EMAIL (used by AccountSettings.tsx)
  @Mutation(() => String)
  async changeEmail(
    @Arg('email') email: string,
    @Arg('newEmail') newEmail: string,
    @Ctx() context: ContextType
  ): Promise<string> {
    const repository = getConnection().getRepository(User);
    const alreadyExists = await repository.findOne({ email: newEmail });

    if (alreadyExists) {
      console.log('email already exists');
      throw new UserInputError(
        'This email is already being used for an account.'
      );
    } else {
      const currentUser = await repository.findOne({ email: email }); //find User with <oldEmail> and change to <newEmail>
      if (currentUser) {
        // const newUser = currentUser;
        // newUser.email = newEmail;
        const userUpdate = await repository.update(
          { id: currentUser.id },
          { email: newEmail }
        );
        //repository.remove(currentUser);
        //console.log('New Email Set to: ' , userUpdate.email);
        sendRefreshToken(context.res, createAccessToken(currentUser));
        return createAccessToken(currentUser);
      } else {
        console.log('Could not find user with email', email);
        throw new UserInputError('Sorry, it seems there was an error.');
      }
    }
  }

  //  CHANGE PASSWORD (used by AccountSettings.tsx)
  @Mutation(() => String)
  async changePassword(
    @Arg('password') password: string,
    @Ctx() context: ContextType
  ): Promise<string> {
    const repository = getConnection().getRepository(User);
    const user = await repository.findOne(context.me!.id);
    if (!user) {
      throw new AuthenticationError('Invalid user.');
    }

    console.log(user.email, user.password);
    const hashedPassword = await bcrypt.hash(password, 10); // encrypting password
    await repository.update({ id: user.id }, { password: hashedPassword });
    console.log(user.email, user.password);
    //sendRefreshToken(context.res, createAccessToken(user));
    //return 'changePassword called in UserResolver.ts';
    return createAccessToken(user);
  }

  @Mutation(() => String)
  async deleteAccount(@Ctx() context: ContextType): Promise<string> {
    const repository = getConnection().getRepository(User);
    const user = await repository.findOne(context.me!.id);
    if (!user) {
      console.log('invalid user');
      throw new AuthenticationError('Invalid user.');
    }
    //TODO:
    //logout user
    //get rid of token (i think?)
    //delete user account
    await repository.delete(user);
    console.log('repository.delete(user) called');
    return 'delete account returned value';
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
    sendRefreshToken(context.res, createRefreshToken(user));
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

  @Authorized()
  @Query(() => Boolean)
  async trackingAnxiety(
    @Ctx() context: ContextType
  ): Promise<Boolean | undefined> {
    const repository = getConnection().getRepository(User);
    const user = await repository.findOne(context.me!.id);
    if (!user) {
      throw new AuthenticationError('Invalid user.');
    }
    return user.trackAnxiety;
  }

  @Authorized()
  @Query(() => Boolean)
  async trackingCaffiene(
    @Ctx() context: ContextType
  ): Promise<Boolean | undefined> {
    const repository = getConnection().getRepository(User);
    const user = await repository.findOne(context.me!.id);
    if (!user) {
      throw new AuthenticationError('Invalid user.');
    }
    return user.trackCaffiene;
  }

  @Authorized()
  @Query(() => Boolean)
  async trackingDreams(
    @Ctx() context: ContextType
  ): Promise<Boolean | undefined> {
    const repository = getConnection().getRepository(User);
    const user = await repository.findOne(context.me!.id);
    if (!user) {
      throw new AuthenticationError('Invalid user.');
    }
    return user.trackDreams;
  }

  @Authorized()
  @Query(() => Boolean)
  async trackingMelatonin(
    @Ctx() context: ContextType
  ): Promise<Boolean | undefined> {
    const repository = getConnection().getRepository(User);
    const user = await repository.findOne(context.me!.id);
    if (!user) {
      throw new AuthenticationError('Invalid user.');
    }
    return user.trackMelatonin;
  }

  @Authorized()
  @Mutation(() => String)
  async updatePreferences(
    @Arg('newTrackAnxiety') newTrackAnxiety: boolean,
    @Arg('newTrackCaffiene') newTrackCaffiene: boolean,
    @Arg('newTrackDreams') newTrackDreams: boolean,
    @Arg('newTrackMelatonin') newTrackMelatonin: boolean,
    @Ctx() context: ContextType // who is current user
  ): Promise<String> {
    const repository = getConnection().getRepository(User);
    const curUser = await repository.findOne(context.me!.id);
    //get user by id: if not, throw error
    if (!curUser) {
      throw new AuthenticationError('User not found ahhhh!');
    }
    await repository.update(
      { id: curUser.id },
      {
        trackAnxiety: newTrackAnxiety,
        trackCaffiene: newTrackCaffiene,
        trackDreams: newTrackDreams,
        trackMelatonin: newTrackMelatonin
      }
    );
    return 'Updated user preferences';
    // If we want to return the updated user, it's going to involve a bit more work here
    //return repository.findOne({ id: curUser.id });
  }
}

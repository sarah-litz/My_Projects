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

    if( alreadyExists ) { 
      console.log('email already exists'); 
      throw new UserInputError('This email is already being used for an account.');
    } 
    
    else { 
      const currentUser = await repository.findOne( { email: email });  //find User with <oldEmail> and change to <newEmail>
      if( currentUser ) {
       // const newUser = currentUser; 
       // newUser.email = newEmail;
        const userUpdate = await repository.update( {id: currentUser.id }, { email: newEmail });
        //repository.remove(currentUser); 
        //console.log('New Email Set to: ' , userUpdate.email);
        sendRefreshToken(context.res, createAccessToken( currentUser ));
        return createAccessToken( currentUser );
      } else { 
        console.log('Could not find user with email', email)
        throw new UserInputError('Sorry, it seems there was an error.'); 
      }
    }
  }; 


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
    await repository.update( { id: user.id }, { password: password }); 
    return 'change password returned value'
  }

  @Mutation(() => String)
  async deleteAccount(
    @Ctx() context: ContextType
  ): Promise<string>{
    const repository = getConnection().getRepository(User); 
    const user = await repository.findOne(context.me!.id); 
    if (!user) {
      throw new AuthenticationError('Invalid user.');
    }
    //TODO: 
    //logout user
    //get rid of token (i think?)
    //delete user account
    await repository.delete(user); 
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
}

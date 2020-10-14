import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../models/User';

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async addUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<string> {
    const repository = getConnection().getRepository(User);
    try {
      const alreadyExists = await repository.findOne({ email }); // make sure users arent duplicated
      if (alreadyExists) {
        console.log('User already exists');
        throw new Error('A user with that email already exists!');
      }

      const user = repository.create({
        email,
        // TODO: encrypt
        password,
        sleepData: []
      });

      console.log(`User saved. id = ${user.id}`);

      return Buffer.from(email).toString('base64'); // return 'access token'
    } catch (error) {
      return 'Error, no user registered.';
    }
  }

  @Mutation(() => String)
  async loginUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<string> {
    const repository = getConnection().getRepository(User);
    // this will check if a user has an account and give a user a login token
    try {
      // TODO: encrypted password
      const user = await repository.findOne({ email, password });

      if (!user) {
        console.log('Invalid email or password.');
        throw new Error('Invalid email or password.');
      }

      return Buffer.from(email).toString('base64'); // should return an 'access token' (need to store this somewhere for frontend to use?)
    } catch (error) {
      return 'Invalid email or password';
    }
  }

  @Query(() => String)
  helloWorld() {
    return 'hello world';
  }
}

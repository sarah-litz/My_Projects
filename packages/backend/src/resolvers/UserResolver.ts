import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../constants';
import { ContextType } from '../type';

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async addUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<boolean> {
    const repository = getConnection().getRepository(User);

    // this will be used to register a user
    const alreadyExists = await repository.findOne({ email }); // make sure users arent duplicated
    if (alreadyExists) {
      console.log('User already exists');
      // TODO: change error to graphql one
      throw new Error('A user with that email already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // encrypting password
    const userReg = repository.create({
      email,
      password: hashedPassword, // encrypted
      sleepData: []
    });
    console.log(`User saved. id = ${userReg.id}`);

    return true;
  }

  @Mutation(() => String, { nullable: true })
  async loginUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: ContextType
  ): Promise<string | null> {
    const repository = getConnection().getRepository(User);

    // this will check if a user has an account and give a user a login token
    try {
      const user = await repository.findOne({ email, password });

      if (!user) {
        console.log('No user registered with that email.');
        return null;
      }

      const passValid = await bcrypt.compare(password, user.password);

      if (!passValid) {
        console.log('Invalid password.');
        return null;
      }

      const refreshToken = sign(
        { userId: user.id, count: user.count },
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: '10d'
        }
      );

      const accessToken = sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: '30min'
      });

      context.res.cookie('refresh-token', refreshToken); // returns refresh token

      return accessToken; // access-token
    } catch (error) {
      return 'Invalid email or password';
    }
  }

  @Query(() => String)
  helloWorld() {
    return 'hello world';
  }
}

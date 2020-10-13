import { User } from './models/User';

export const resolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      const { id } = args;

      return await User.findOne({ where: { id: id } });
    }
  },

  Mutation: {
    addUser: async (_: any, args: any) => {
      // this will be used to register a user
      const { email, password } = args;
      try {
        const alreadyExists = await User.findOne({ email }); // make sure users arent duplicated
        if (alreadyExists) {
          console.log('User already exists');
          throw new Error('A user with that email already exists!');
        }

        const user = User.create({
          email,
          password
        });

        await user.save();
        console.log(`User saved. id = ${user.id}`);

        return Buffer.from(email).toString('base64'); // return 'access token'
      } catch (error) {
        return 'Error, no user registered.';
      }
    },
    loginUser: async (_: any, args: any) => {
      // this will check if a user has an account and give a user a login token
      const { email, password } = args;
      try {
        const user = await User.findOne({ email, password });

        if (!user) {
          console.log('Invalid email or password.');
          throw new Error('Invalid email or password.');
        }

        return Buffer.from(email).toString('base64'); // should return an 'access token' (need to store this somewhere for frontend to use?)
      } catch (error) {
        return 'Invalid email or password';
      }
    }
  }
};

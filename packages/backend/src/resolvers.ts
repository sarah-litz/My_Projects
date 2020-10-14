import { User } from './models/User';
import bcrypt from 'bcryptjs';
import { IResolvers } from "graphql-tools";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constants";


export const resolvers: IResolvers = {
  
  Query: {
    getUser: async (_: any, {id} : any) => {  // will output the user based on id
      return await User.findOne({ where: { id: id } });
    },

    currUser: (_: any,__: any, {req}: any) => {  // will output the user currently logged in
      if (!req.userId) {
        return("No user with this id");
      }

      return User.findOne(req.userId);
    }
  },
  Mutation: {
    addUser: async (_: any, { email, password }: any) => {
      // this will be used to register a user
      try {
        const alreadyExists = await User.findOne({ email }); // make sure users arent duplicated
        if (alreadyExists) {
          console.log('User already exists');
          throw new Error('A user with that email already exists!');
        }

        const hashedPassword = await bcrypt.hash(password, 10); // encrypting password
        const userReg = User.create({
          email,
          password: hashedPassword // encrypted
        });

        await userReg.save();
        console.log(`User saved. id = ${userReg.id}`);

        return true; 
      } catch (error) {
        return 'Error, no user registered.';
      }
    },
    loginUser: async (_: any, { email, password }: any, { res }: any) => {
      // this will check if a user has an account and give a user a login token
      try {
        const user = await User.findOne({ where: {email} });

        if (!user) {
          console.log('No user registered with that email.');
          return null;
        }

        const passValid = await bcrypt.compare(password, user.password);

        if (!passValid){
          console.log('Invalid password.');
          return null;
        }

        const refreshToken = sign({userId: user.id, count: user.count},
          REFRESH_TOKEN_SECRET,
          {
            expiresIn: "10d"
          }
        );

        const accessToken = sign({ userId: user.id },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30min"
          }
        );
        
        res.cookie("refresh-token", refreshToken); // returns refresh token
        res.cookie("access-token", accessToken);  // returns access token

        return user; // return id and email (password is encrypted)
      } catch (error) {
        return 'Invalid email or password';
      }
    }
  }
};

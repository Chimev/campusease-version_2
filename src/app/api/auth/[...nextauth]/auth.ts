import { NextAuthOptions } from "next-auth";// ts
import CredentialsProvider from "next-auth/providers/credentials"
import User from '@/utilis/models/User';
import  {connectToDB}  from '@/utilis/connectToDB';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: {label: "Email", type: "email"},
          password: {label: "Password", type: "password"},
        },
        async authorize(credentials: any) {
          await connectToDB();
          try {
            const user = await User.findOne({email: credentials.email});
            if(user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              )
              if(isPasswordCorrect) {
                return user;
              }
            }
            return null;
          } catch (error: any) {
            throw new Error(error);
          }
        }
      })
    ],
  }


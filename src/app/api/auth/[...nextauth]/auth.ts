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
                return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  phone: user.phone
                }
              }
            }
            return null;
          } catch (error: any) {
            throw new Error(error);
          }
        }
      })
    ],
    session: {
      // Use JWT for sessions
      strategy: 'jwt',
      maxAge: 24 * 60 * 60, // 1 day session
    },
    jwt: {
      // Configure token expiration and issue refresh if needed
      maxAge: 24 * 60 * 60, // 1 day expiry
    },
    pages: {
      // Redirect to login page if not authenticated
      signIn: '/sign-in', 
    },

    callbacks: {
      // Attach user ID to the JWT token
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.phone = user.phone
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          if (session.user) {
            session.user.id = token.id as string; 
            session.user.phone = token.phone as string;
          }
        }
        return session;
      }
    },
  }


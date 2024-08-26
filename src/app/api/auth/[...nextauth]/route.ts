
import NextAuth from "next-auth/next";
import { authOptions } from "./auth";

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};




// import NextAuth from "next-auth"
// import { Account, User as AuthUser } from "next-auth";
// import GithubProvider from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials"
// import User from '@/utilis/models/User';
// import  {connectToDB}  from '@/utilis/connectToDB';
// import bcrypt from 'bcryptjs';



// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: {label: "Email", type: "email"},
//         password: {label: "Password", type: "password"},
//       },
//       async authorize(credentials: any) {
//         await connectToDB();
//         try {
//           const user = await User.findOne({email: credentials.email});
//           if(user) {
//             const isPasswordCorrect = await bcrypt.compare(
//               credentials.password,
//               user.password
//             )
//             if(isPasswordCorrect) {
//               return user;
//             }
//           }
//           return null;
//         } catch (error: any) {
//           throw new Error(error);
//         }
//       }
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID ?? "",
//       clientSecret: process.env.GITHUB_SECRET ?? "",
//     }),
//     // ...add more providers here
//   ],
// }

// export const handler = NextAuth(authOptions);
// export {handler as GET, handler as POST};
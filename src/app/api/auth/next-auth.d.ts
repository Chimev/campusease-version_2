// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the id property
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      school?: string | null;
    };
  }
  interface User {
    id: string;
    phone: string;
    school: string;
  }
}

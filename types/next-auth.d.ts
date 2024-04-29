import NextAuth, { DefaultSession } from "next-auth";
import type {User} from "next-auth";
import {JWT, DefaultJWT} from 'next-auth/jwt';

declare module "next-auth" {
  interface User {
    role: string
  };
  interface Session {
    user: {
      role: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}


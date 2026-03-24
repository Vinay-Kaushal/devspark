import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: string;
      username: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    plan?: string;
    username?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    plan?: string;
    username?: string | null;
  }
}
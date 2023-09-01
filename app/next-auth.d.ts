import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      fullname: string;
      email: string;
      accessToken: string;
    } & Session["user"];
  }
}

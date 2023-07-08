import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const resp = await prisma.user_credentials.findFirst({
          where: {
            email: credentials!.email,
          },
        });

        if (!resp) {
          throw new Error("Invalid credentials");
        }

        const comparePass = await compare(credentials!.password, resp.password);

        if (!comparePass) {
          throw new Error("Invalid Credentials");
        }

        const user = {
          id: String(resp?.id),
          username: resp?.email,
        };

        console.log(user);

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log(token);
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.username = (user as User).name;
      }
      if(user){
        token.id = user.id
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

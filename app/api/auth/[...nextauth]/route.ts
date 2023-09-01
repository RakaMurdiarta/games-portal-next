import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { sign, verify } from "jsonwebtoken";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    encode: ({ secret, token }) => {
      const jwtToken = sign(
        {
          ...token,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      return jwtToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = verify(token!, secret);
      return decodedToken as JWT;
    },
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
          id: resp.id,
          username: resp.username,
          fullname: resp.fullname,
          email: resp.email,
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
      console.log(user)
      if (account) {
        token.accessToken = account.access_token
        token.id = user.id;
        token.username = (user as User).name;
      }

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken;
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

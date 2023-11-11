import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import getLimiterHeaders from "./getLimiterHeaders";
import rateLimiter from "./rateLimiter";
import redisClient from "./redis";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jankowalski@gmail.com",
        },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials, request): Promise<any> {
        try {
          const requestIp = request.headers["x-forwarded-for"] ?? "127.0.0.1";

          const result = await rateLimiter(
            redisClient,
            requestIp,
            10,
            60,
            "/login"
          );

          if (!result.success) {
            return {
              error: "Zbyt wiele prób. Spróbuj ponownie za chwilę",
              type: "error",
            };
          }

          if (!credentials.email || !credentials.password) {
            return { error: "Nie podano danych" };
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
            include: {
              ownedProducts: {},
            },
          });

          if (!user) {
            return { error: "Podano niepoprawne dane logowania" };
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordsMatch) {
            return { error: "Podano niepoprawne dane logowania" };
          }
          if (!user.emailVerified) {
            return { error: "Twój email jest niezweryfikowany!" };
          }

          // console.log(user);
          return user;
        } catch (err) {
          console.error(err);
          console.log(`Failed login attempt on: ${credentials?.email}`);
          return { error: "Wystąpił błąd" };
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user }: { user: any }) {
      if (user?.error) {
        throw new Error(user.error);
      } else {
        return true;
      }
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.ownedProducts = user.ownedProducts;
      }
      return token;
    },
    async session({ session, token }: any) {
      session = {
        ...session,
        user: {
          id: token.userId,
          email: token.email,
          ownedProducts: token.ownedProducts,
        },
      };
      return session;
    },
  },
  secret: process.env.SECRET,
  pages: {
    signIn: "/login",
  },
};

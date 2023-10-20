import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials.email || !credentials.password) {
            return { error: "Nie podano danych" };
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
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
  },
  callbacks: {
    async signIn({ user }: { user: any }) {
      if (user?.error) {
        throw new Error(user.error);
      } else {
        return true;
      }
    },
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
};

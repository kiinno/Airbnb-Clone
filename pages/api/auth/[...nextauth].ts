import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/libs/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "Email-Address",
          required: true,
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Password",
          required: true,
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Invalid credentials");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword)
          throw new Error("Invalid credentials");

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValidPassword) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);

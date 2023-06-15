import bcryptjs from "bcryptjs";
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/user";
import db from "@/utils/db";

  const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/pages/account/login",
    signOut: "/",
    //signOut: "/",
    error: "/auth/error", // Error code passed in query string as ?error=
    //verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.role) token.role = user.role;
      if (user?.first_name) token.first_name = user.first_name;
      if (user?.last_name) token.last_name = user.last_name;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.role) session.user.role = token.role;
      if (token?.first_name) session.user.first_name = token.first_name;
      if (token?.last_name) session.user.last_name = token.last_name;
      return session;
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();

        const user = await User.findOne({
          email: credentials.email,
        });

        await db.disconnect();

        if (!user) {
          throw new Error("User with this email doesn't exists.");
        }
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
          };
        }
        throw new Error("The password submitted is incorrect.");
      },
    }),
  ],
});
export { handler as GET, handler as POST }

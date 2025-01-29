import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      await connectToDB();
      //after connection to database we're checking is the user is nt an existing user we'll create a new one otherwise just return the existing user.
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      return true;
    },
    async session({ session, token }) {
      (session.user as any).id = token.sub;
      return session;
    },
  },
};

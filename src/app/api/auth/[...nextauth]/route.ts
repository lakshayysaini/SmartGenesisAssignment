import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";

export const dynamic = "force-dynamic";

const authOptions: NextAuthOptions = {
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

      // Check if the user exists in the database, create if not
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

const handler = NextAuth(authOptions);

// Exporting the NextAuth handler for GET and POST methods
export { handler as GET, handler as POST };

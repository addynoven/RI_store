import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

// Mock users database - in real app, this would be a database
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "demo123", // In real app, this would be hashed
    image: null,
  },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user in mock database
        const user = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // signOut: '/logout',
    // error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

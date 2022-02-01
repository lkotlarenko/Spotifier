import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL } from "../../../lib/spotify";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
      signIn: '/login'
  },
  callbacks: {
      async jwt({ token, account, user }){
        if (account && user) {
            return {
                ...token,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at * 1000,
            }
        }
        if (Date.now() < token.accessTokenExpires) {
            return token;
        }
      }
  }
});

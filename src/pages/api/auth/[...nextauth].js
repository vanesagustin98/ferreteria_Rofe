import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import User from "../../../models/user";
// import bcrypt from "bcryptjs";
// import dbConnect from "../../../app/config/dbConnect";
import GoogleProvider from "next-auth/providers/google";
import { useDispatch } from "react-redux";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: "http://localhost:3000/api/auth/callback/google",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user, profile, useDispatch }) => {
      // const dispatch = Provider.useDispatch();
      // const router = useRouter()
      const gUser = {
        name: profile.name,
        email: profile.email,
        image: profile.image,
      }
      
      // const credencial = await dispatch(user_credential(gUser.name, gUser.email, gUser.image));
      console.log("gUser", gUser)
      return true;
    },
    async redirect({ url, baseUrl, }) {
      return baseUrl;
    },
  },
});

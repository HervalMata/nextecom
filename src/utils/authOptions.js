import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import User from "@/app/models/user";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Usuário ou senha inválidos.");
        }

        if (!user?.password) {
          throw new Error("Por favor entre pelo metodo que você se cadastrou");
        }

        const isPasswordMatched = await bcrypt.compare(
          password,
          user?.password,
        );

        if (!isPasswordMatched) {
          throw new Error("Usuário ou senha inválidos.");
        }

        return user;
      },
    }),
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID;
      clientSecret: process.env.GOOGLE_CLIENT_SECRET;
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
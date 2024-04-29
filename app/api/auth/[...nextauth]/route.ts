import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcrypt";
import {sql} from "@vercel/postgres";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [CredentialsProvider({
        credentials: {
            email: {},
            password: {},
            accountType: {},
        },
        async authorize (credentials,req) {
            try{
                if (credentials?.accountType == "Individual") {
                    const response = await sql `SELECT * FROM Individual WHERE email=${credentials?.email}`;
                    const user = response.rows[0];
                    const passwordCorrect = await compare(credentials?.password || "", user.password);
                    console.log({passwordCorrect});
                    if (passwordCorrect) {
                        return {
                            id: user.individualid,
                            email: user.email,
                            role: credentials?.accountType,
                        };
                    }
                }
                else if (credentials?.accountType == "Company") {
                    const response = await sql `SELECT * FROM Company WHERE email=${credentials?.email}`;
                    const user = response.rows[0];
                    const passwordCorrect = await compare(credentials?.password || "", user.password);
                    console.log({passwordCorrect});
                    if (passwordCorrect) {
                        return {
                            id: user.companyid,
                            email: user.email,
                            role: credentials?.accountType,
                        };
                    }
                }
                else if (credentials?.accountType == "Nonprofit") {
                    const response = await sql `SELECT * FROM Nonprofit WHERE email=${credentials?.email}`;
                    const user = response.rows[0];
                    const passwordCorrect = await compare(credentials?.password || "", user.password);
                    console.log({passwordCorrect});
                    if (passwordCorrect) {
                        return {
                            id: user.nonprofitid,
                            email: user.email,
                            role: credentials?.accountType,
                        };
                    }
                }
                
                return null;
            }
            catch(err) {
                console.log(err)
            }
            console.log({credentials});
        },
    }),
    ],
    callbacks : {
        async jwt({token, user}) {
            if (user) {
                token.role = user.role;
            }
            return token
        },
        async session({session,token}) {
            if (session?.user) session.user.role = token.role;
            return session;
        }
    }
});

export {handler as GET, handler as POST};
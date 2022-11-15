import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { verifyPassword } from '../../../../my-auth/lib/auth';

const prisma = new PrismaClient();

export const authOptions = {
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            // name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user) {
                    throw new Error('No user found!');
                } else {
                    const isValid = await verifyPassword(credentials.password, user.password);
                    if (!isValid) {
                        throw new Error('Wrong password! Try again');
                    }
                }
                return user.email;
            },
            secret: "secret"
        })
    ],
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.accessToken = user.token;
            }
            return token;
        },
        async session(session, token) {
            session.accessToken = token.accessToken;
            return session;
        }
    }
}

export default NextAuth(authOptions);


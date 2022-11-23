import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { verifyPassword } from '../../../lib/auth';

const prisma = new PrismaClient();

export const authOptions = {
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            // name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const user = await prisma.user.findFirst({
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
                return user;
                
            },
            secret: process.env.NEXTAUTH_SECRET
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        }
    }
}

export default NextAuth(authOptions);


import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from './db/prisma';
import { compare } from '@/lib/encrypt';
import { cookies } from 'next/headers';
import { authConfig } from './auth.config';

export const authOptions = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
    },
    session: {
      strategy: 'jwt' as const,
      maxAge: 30 * 24 * 60 * 60, //30 days
  },
    
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' }
            },
            async authorize(credentials) {
                if (credentials == null ) return null;

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string
                    }
                })

                if (user && user.password) {
                    const isMatch = await compare(credentials.password as string, user.password);
                    if (isMatch) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    }
                }

                return null;
            }
        }) 
    ],
    callbacks: {
        ...authConfig.callbacks,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, user, trigger, token }: any) {
            //Set the user id from the token
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;

            //If there is an update, set the user name
            if (trigger === 'update') {
              session.user.name = user.name
            }

            return session;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user, trigger, session }: any) {
            if (user) {
                token.role = user.role;
                token.id = user.id;

                if (user.name === 'NO_NAME') {
                    token.name = user.email!.split('@')[0];

                    await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            name:token.name
                        }
                    })
                }

                if (trigger === 'signIn' || trigger === 'signUp') {
                    const cookiesObject = await cookies();
                    const sessionCartId = cookiesObject.get('sessionCartId')?.value;

                    if (sessionCartId) {
                        const sessionCart = await prisma.cart.findFirst({
                            where: { sessionCartId }
                        })

                        if (sessionCart) {
                            await prisma.cart.deleteMany({
                                where: {
                                    userId: user.id
                                },
                            });

                            await prisma.cart.update({
                                where: {
                                    id: sessionCart.id
                                },
                                data: {
                                    userId: user.id
                                }
                            })
                        }
                    }
                }
            }

            if (session?.user.name && trigger === 'update') {
                token.name = session.user.name
            }

          return token;
        },
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
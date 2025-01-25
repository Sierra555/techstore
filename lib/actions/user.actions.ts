'use server';

import { shippingAddressSchema, SignInFormSchema, SignUpFormSchema, updateProfileSchema } from '@/schema/validators';
import { auth, signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { hashSync } from 'bcryptjs';
import { prisma } from '@/db/prisma';
import { formatError } from '../utils';
import { ShippingAddress } from '@/types';
import { paymentMethodSchema } from '@/schema/validators';
import { z } from 'zod';

export async function signInWithCredentials(prevState: unknown, 
    formData: FormData) {
        try {
            const user = SignInFormSchema.parse({
                email: formData.get('email'),
                password: formData.get('password')
            });

            await signIn('credentials', user);
            
            return {success: true, message: 'Signed in successfully'}
        } catch (error) {
            if (isRedirectError(error)) {
                throw error;
            } 

            return {success: false, message: 'Invalid email or password'}
        }
} 

export async function signOutUser() {
  await signOut();
}

export async function signInWithGoogle() {
  await signIn('google');
}

export async function signUpUser(prevState: unknown, 
    formData: FormData) {
        try {
            const user = SignUpFormSchema.parse({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword')
            });

            const plainPw = user.password
            
            user.password = hashSync(user.password, 10);
            
            await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
            })

            await signIn('credentials', {
                email: user.email,
                password: plainPw
            });
            
            return {success: true, message: 'Signed up successfully'}
        } catch (error) {
            if (isRedirectError(error)) {
                throw error;
            } 

            return {success: false, message: formatError(error) }
        }
} 

export async function getUserById(userId: string) {
    const user = await prisma.user.findFirst({
        where: { id: userId }
    })
    if (!user) throw new Error("User not found");

    return user;
}

export async function updateUserAddress(data: ShippingAddress) {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        const currentUser = await prisma.user.findFirst({
            where: { id: userId}
        })

        if (!currentUser) throw new Error('No user found');

        const address = shippingAddressSchema.parse(data);

        await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {address}
        });

        return {
            success: true,
            message: 'User address updated successfully'
        }
        
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

export async function updateUserPaymentMethod(data: z.infer<typeof paymentMethodSchema>) {
    try {
        const session = await auth();
        const currentUser = await prisma.user.findFirst({
            where: {
                id: session?.user?.id,
            }
        })

        if (!currentUser) throw new Error('User not found');

        const paymentMethod = paymentMethodSchema.parse(data);

        await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                paymentMethod: paymentMethod.type
            }
        });

        return { success: true, message: 'Payment method was updated' }

    } catch (error) {
        return { success: false, message: formatError(error) }
    } 
};

export async function updateUserProfile(user: { name: string, email: string }) {
    try {
        const session = await auth();
        const currentUser = await prisma.user.findFirst({
            where: {
                id: session?.user?.id
            }
        });

        if (!currentUser) throw new Error('User not found');

        const newData = updateProfileSchema.parse(user);

        await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name: newData.name,
                email: newData.email
            }
        })

        return {
            success: true,
            message: ''
        }
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    } 
}

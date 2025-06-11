"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const loginAction = async (email: string, password: string) => {
    try {
        // create a supabase client
        // this client is used to interact with the auth service
        const { auth } = await createClient();
        const { error } = await auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            throw error;
        }
        // if there is no error 
        return { errorMessage: null };
    } catch (error) {
        console.error('Error logging in user:', error);
        return handleError(error);
    }
}

export const signupAction = async (email: string, password: string) => {
    try {
        // create a supabase client
        // this client is used to interact with the auth service
        const { auth } = await createClient();
        const { data, error } = await auth.signUp({
            email,
            password,
        })
        if (error) {
            throw error;
        }
        // if there is no error, data will contain the user information
        const userId = data.user?.id;

        //if userId is not present, throw an error
        if (!userId) {
            throw new Error('Error creating user: User ID is not present in the response');
        }

        //add user to database 
        await prisma.user.create({
            data: {
                id: userId,
                email: email,
            }
        })
        // if there is no error 
        return { errorMessage: null };
    } catch (error) {
        // log the error to the console
        console.error('Error logging in user:', error);
        return handleError(error);
    }
}

export const logoutAction = async () => {
    try {
        const { auth } = await createClient();
        const { error } = await auth.signOut({
        })
        if (error) {
            throw error;
        }
        // if there is no error 
        return { errorMessage: null };
    } catch (error) {
        console.error('Error logging in user:', error);
        return handleError(error);
    }
}
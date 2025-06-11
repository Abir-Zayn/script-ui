'use client'
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { loginAction, signupAction } from '@/actions/user';

type Props = {
    type: 'login' | 'signup';
}

function AuthForm({ type }: Props) {
    const isLoginForm = type === 'login'; // Determine if the form is for login or signup
    const router = useRouter();

    // useTransition hook for managing pending state during form submission
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            // Extract form data
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            let errorMessage;
            let title;
            let description;

            // perform login or signup action based on the form type
            if (isLoginForm) {
                errorMessage = (await loginAction(email, password)).errorMessage;
                title = 'Logged in successfully';
                description = 'Welcome back!';
            } else {
                errorMessage = (await signupAction(email, password)).errorMessage;
                title = 'Account created successfully';
                description = 'Welcome aboard!';
            }

            if (!errorMessage) {
                // Show a success notification
                toast.success(title, {
                    description,
                });
                router.replace("/");
            } else {
                // Show an error notification
                toast.error(title, {
                    description: errorMessage,
                });
            }
        });
    }


    return (
        // Form for login or signup
        // Uses handleSubmit to manage form submission
        <form action={handleSubmit}>
            <CardContent className='grid w-full items-center gap-6'>
                <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='Enter your email'
                        required
                        disabled={isPending}
                    />
                </div>
                <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Password'
                        required
                        disabled={isPending}
                    />
                </div>
            </CardContent>
            <CardFooter className='mt-6 flex flex-col gap-6'>
                <Button type='submit' className='w-full'>
                    {/* Show spinner during pending state, otherwise show button text */}
                    {isPending ? <Loader2 className='animate-spin' /> : isLoginForm ? 'Login' : 'Sign Up'}
                </Button>
                {/* Link to switch between login/signup */}
                <p className='text-xs'>
                    {
                        isLoginForm ? "Don't have an account?" :
                            "Already have an account?"
                    }{" "}
                    <Link
                        href={isLoginForm ? '/signup' : '/login'}
                        className='text-blue-500 hover:text-blue-700 font-semibold'
                    >
                        {isLoginForm ? 'Sign Up' : 'Login'}
                    </Link>
                </p>
            </CardFooter>
        </form>

    )
}

export default AuthForm
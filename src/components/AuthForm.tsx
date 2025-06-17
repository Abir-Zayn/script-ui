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
    const isLoginForm = type === 'login';
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            let errorMessage;
            let title;
            let description;

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
                toast.success(title, {
                    description,
                });
                // Navigate to main dashboard instead of homePage
                router.replace("/");
            } else {
                toast.error(title, {
                    description: errorMessage,
                });
            }
        });
    }

    return (
        <form action={handleSubmit}>
            <CardContent className='space-y-4 pt-0'>
                <div className='space-y-2'>
                    <Label htmlFor='email' className='text-sm font-medium text-foreground'>Email</Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='Enter your email'
                        required
                        disabled={isPending}
                        className='h-11'
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='password' className='text-sm font-medium text-foreground'>Password</Label>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Password'
                        required
                        disabled={isPending}
                        className='h-11'
                    />
                </div>
            </CardContent>
            <CardFooter className='flex flex-col space-y-4 pt-10'>
                <Button
                    type='submit'
                    className='w-full h-15 font-medium'
                    disabled={isPending}
                >
                    {isPending ? (
                        <Loader2 className='w-4 h-4 animate-spin' />
                    ) : (
                        isLoginForm ? 'Sign In' : 'Create Account'
                    )}
                </Button>
                <p className='text-sm text-center text-muted-foreground'>
                    {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
                    <Link
                        href={isLoginForm ? '/signup' : '/login'}
                        className='text-primary hover:text-primary/90 font-medium underline-offset-4 hover:underline transition-colors'
                    >
                        {isLoginForm ? 'Sign up' : 'Sign in'}
                    </Link>
                </p>
            </CardFooter>
        </form>
    )
}

export default AuthForm
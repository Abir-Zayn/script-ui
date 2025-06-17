import { getUser } from '@/auth/server';
import AuthForm from '@/components/AuthForm'
import Header from '@/components/Header';
import { Card } from '@/components/ui/card'
import React from 'react'
import SocialLoginButtons from '../login/components/Social-Login-buttons';
import LoginPageHero from '../login/components/LoginPageHero';

async function SignUpPage() {
    const user = await getUser();

    return (
        <div className='min-h-screen flex flex-col'>
            {/* Header */}
            <Header user={user} />

            {/* Main Content */}
            <div className='flex-1 flex'>
                {/* Left Column - Signup Form */}
                <div className='flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background relative'>
                    <div className='w-full max-w-md'>
                        {/* Centered Header Text with Bubbles */}
                        <div className='text-center mb-6 relative'>
                            {/* Decorative Bubbles - Different positions and colors for variety */}
                            <div className='absolute -right-15 -top-15 hidden sm:block'>
                                <div
                                    className='w-25 h-25 rounded-full sm:animate-pulse'
                                    style={{ backgroundColor: '#10B981' }}
                                ></div>
                            </div>
                            <div
                                className='absolute -left-4 top-8 hidden sm:block'
                            >
                                <div
                                    className='w-10 h-10 rounded-full sm:animate-pulse'
                                    style={{
                                        backgroundColor: '#60A5FA',
                                        animationDelay: '0.7s'
                                    }}
                                ></div>
                            </div>
                            <div
                                className='absolute -right-6 bottom-2 hidden sm:block'
                            >
                                <div
                                    className='w-6 h-6 rounded-full sm:animate-pulse'
                                    style={{
                                        backgroundColor: '#F59E0B',
                                        animationDelay: '1s'
                                    }}
                                ></div>
                            </div>

                            <h1 className='text-2xl lg:text-3xl font-bold text-foreground mb-2'>
                                Sign Up
                            </h1>
                            <p className='text-muted-foreground'>
                                Create your account to get started
                            </p>
                        </div>

                        {/* Card */}
                        <Card className="w-full shadow-lg border-0 bg-background">
                            {/* Auth Form */}
                            <AuthForm type="signup" />

                            <div className="p-6 space-y-4">
                                <SocialLoginButtons />
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Right Column - Hero Section */}
                <LoginPageHero />
            </div>
        </div>
    )
}

export default SignUpPage
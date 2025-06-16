import { getUser } from '@/auth/server';
import AuthForm from '@/components/AuthForm'
import Header from '@/components/Header';
import { Card } from '@/components/ui/card'
import React from 'react'
import SocialLoginButtons from './components/Social-Login-buttons';
import LoginPageHero from './components/LoginPageHero';

async function LoginPage() {
    const user = await getUser();

    return (
        <div className='min-h-screen flex flex-col'>
            {/* header */}
            <Header user={user} />

            {/* main content */}
            <div className='flex-1 flex'>
                {/* Left Column - Login Form */}
                <div className='flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background relative'>

                    <div className='w-full max-w-md'>
                        {/* Centered Header Text with Bubbles */}
                        <div className='text-center mb-6 relative'>
                            {/* Decorative Bubbles */}
                            <div className='absolute -left-15 -top-15 hidden sm:block'>
                                <div
                                    className='w-25 h-25 rounded-full sm:animate-pulse'
                                    style={{ backgroundColor: '#E7900D' }}
                                ></div>
                            </div>
                            <div
                                className='absolute top-4 hidden sm:block'
                            >
                                <div
                                    className='w-10 h-10 rounded-full sm:animate-pulse '
                                    style={{
                                        backgroundColor: '#F0C483',
                                        animationDelay: '0.5s'
                                    }}
                                ></div>
                            </div>

                            <h1 className='text-2xl lg:text-3xl font-bold text-foreground mb-2'>
                                Log In
                            </h1>
                            <p className='text-muted-foreground'>
                                Welcome back! Please enter your details
                            </p>
                        </div>

                        {/* Card */}
                        <Card className="w-full shadow-lg border-0 bg-background">
                            {/* Auth Form */}
                            <AuthForm type="login" />

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

export default LoginPage
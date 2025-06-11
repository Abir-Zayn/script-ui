import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { shadow } from '@/styles/utils'
import { Button } from './ui/button';
import { DarkModeToggle } from './DarkModeToggle';
import { getUser } from '@/auth/server';
import LogoutButton from './LogoutButton';
import { Sidebar } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';

async function Header() {
    const user = await getUser();
    return (
        <header className='relative flex h-24 w-full items-center justify-between bg-background px-3 
            sm:px-8'
            style={{
                boxShadow: shadow
            }}
        >
            <SidebarTrigger className='absolute left-2 top-2' />
            <Link href="/" className='flex items-end gap-2'>
                <Image src="/appLogo.png"
                    className="rounded-full"
                    priority
                    alt="App Logo"
                    width={65}
                    height={50} />
                <h1 className='flex flex-col pb-1 text-2xl font-semibold leading-6 text-left'>
                    Script
                    <span className="text-left">Universe</span>
                </h1>
            </Link>

            <div className='flex gap-4'>
                {/* Dark Mode Toggle */}
                <DarkModeToggle />
                {user ? (
                    <LogoutButton />
                ) : (
                    <>


                        <Button asChild >
                            <Link href="/login" className='text-sm hidden sm:block font-semibold text-foreground hover:text-foreground/80'>
                                Login
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/signup" className='text-sm font-semibold text-foreground hover:text-foreground/80'>
                                Sign Up
                            </Link>
                        </Button>
                    </>
                )}

            </div>
        </header>
    )
}

export default Header
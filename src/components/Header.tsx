'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button';
import { DarkModeToggle } from './DarkModeToggle';
import LogoutButton from './LogoutButton';
import { Menu, X, PanelLeft } from "lucide-react";
import { useSidebar } from './ui/sidebar';

type Props = {
    user?: any;
}

function Header({ user }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Get sidebar functions if available (only when user is logged in)
    const sidebarContext = user ? useSidebar() : null;

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigationItems = [
        { href: "#features", label: "Features" },
        { href: "#about", label: "About" },
        { href: "#pricing", label: "Pricing" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <header
            className={`
                sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
                ${isScrolled
                    ? 'bg-background/80 backdrop-blur-md border-b border-border/50'
                    : 'bg-background border-b border-border'
                }
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">

                    {/* Left Section: Sidebar Trigger + Logo */}
                    <div className="flex items-center gap-4">
                        {/* Sidebar Trigger - Only show when user is logged in */}
                        {user && sidebarContext && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={sidebarContext.toggleSidebar}
                                className="p-2 h-9 w-9 hover:bg-muted rounded-md transition-colors duration-200"
                                aria-label="Toggle sidebar"
                            >
                                <PanelLeft className="h-4 w-4" />
                            </Button>
                        )}

                        {/* Logo Section - Fades out on scroll */}
                        <div className={`
                            flex items-center transition-all duration-300 ease-in-out
                            ${isScrolled ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}
                        `}>
                            <Link href={user ? "/" : "/landing"} className='flex items-end gap-2'>
                                <Image
                                    src="/appLogo.png"
                                    className="rounded-full"
                                    priority
                                    alt="App Logo"
                                    width={50}
                                    height={40}
                                />
                                <h1 className='flex flex-col pb-1 text-xl lg:text-2xl font-semibold leading-5 text-left'>
                                    Script
                                    <span className="text-left">Universe</span>
                                </h1>
                            </Link>
                        </div>
                    </div>

                    {/* Center Section: Desktop Navigation */}
                    <nav className={`
                        hidden md:flex space-x-6 lg:space-x-8 transition-all duration-300 ease-in-out
                        ${isScrolled ? 'scale-105' : 'scale-100'}
                    `}>
                        {navigationItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right Section: Auth Buttons + Dark Mode Toggle */}
                    <div className="flex items-center gap-3">
                        {/* Dark Mode Toggle - Always visible */}
                        <DarkModeToggle />

                        {/* Authentication Buttons - Hidden on scroll */}
                        <div className={`
                            hidden md:flex items-center gap-3 transition-all duration-300 ease-in-out
                            ${isScrolled ? 'opacity-0 translate-x-[20px]' : 'opacity-100 translate-x-0'}
                        `}>
                            {user ? (
                                <LogoutButton />
                            ) : (
                                <>
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href="/login" className='font-semibold'>
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button asChild size="sm">
                                        <Link href="/signup" className='font-semibold'>
                                            Get Started
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors duration-200"
                            aria-label="Toggle mobile menu"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
                        <nav className="flex flex-col space-y-3">
                            {/* Navigation Links */}
                            {navigationItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}

                            {/* Mobile Auth Buttons */}
                            <div className={`
                                flex flex-col space-y-3 pt-4 border-t border-border/30 transition-all duration-300
                                ${isScrolled ? 'opacity-50' : 'opacity-100'}
                            `}>
                                {user ? (
                                    <LogoutButton />
                                ) : (
                                    <>
                                        <Button asChild variant="ghost" className="justify-start">
                                            <Link href="/login" className='font-semibold'>
                                                Sign In
                                            </Link>
                                        </Button>
                                        <Button asChild className="justify-start">
                                            <Link href="/signup" className='font-semibold'>
                                                Get Started
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
'use client'

import { useState, useEffect } from 'react';
import { useSidebar } from './ui/sidebar';
import { DarkModeToggle } from './DarkModeToggle';
import LogoutButton from './LogoutButton';
import Image from 'next/image';
import Link from 'next/link';
import { User, ChevronDown, LogOut, Settings } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';

type Props = {
    user?: any;
    showSidebar?: boolean; // Add this prop to control sidebar visibility
}

function Header({ user, showSidebar = false }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Only use sidebar when showSidebar is true and user is logged in
    let sidebarContext = null;
    try {
        // Conditionally use sidebar hook only when needed
        if (showSidebar && user) {
            sidebarContext = useSidebar();
        }
    } catch (error) {
        // Silently handle the case where SidebarProvider is not available
        sidebarContext = null;
    }

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
                        {/* Only show sidebar trigger when showSidebar is true and user is logged in */}
                        {showSidebar && user && sidebarContext && (
                            <button
                                onClick={sidebarContext.toggleSidebar}
                                className="lg:hidden p-2 rounded-md hover:bg-muted"
                            >
                                <span className="sr-only">Toggle sidebar</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        )}

                        {/* Logo - Clickable and navigates to landing page */}
                        <Link
                            href="/landing"
                            className={`
                                flex items-center transition-all duration-300 ease-in-out hover:opacity-80
                                ${isScrolled ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}
                            `}
                        >
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/appLogo.png" // Replace with your actual logo path
                                    alt="ScriptUI Logo"
                                    width={50}
                                    height={50}
                                    className="hover:scale-105 transition-transform"
                                />

                            </div>
                        </Link>
                    </div>

                    {/* Center Section: Desktop Navigation (only for landing page) */}
                    {!user && (
                        <nav className={`
                            hidden md:flex space-x-6 lg:space-x-8 transition-all duration-300 ease-in-out
                            ${isScrolled ? 'scale-105' : 'scale-100'}
                        `}>
                            {navigationItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-foreground hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    )}

                    {/* Right Section: Auth Buttons + Dark Mode Toggle */}
                    <div className="flex items-center gap-3">
                        <DarkModeToggle />

                        {/* Auth buttons for unauthenticated users */}
                        {!user && (
                            <div className={`
                                hidden md:flex items-center gap-3 transition-all duration-300 ease-in-out
                                ${isScrolled ? 'opacity-0 translate-x-[20px]' : 'opacity-100 translate-x-0'}
                            `}>
                                <Link
                                    href="/login"
                                    className="text-foreground hover:text-primary transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* User dropdown menu for authenticated users */}
                        {user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-sm font-medium hidden sm:inline">
                                                {user.email?.split('@')[0]}
                                            </span>
                                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {user.email?.split('@')[0]}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    {/* Navigation items for authenticated users */}
                                    <DropdownMenuItem asChild>
                                        <Link href="/landing" className="flex items-center w-full">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Home</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    {/* Logout option */}
                                    <DropdownMenuItem asChild>
                                        <div className="w-full">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <LogoutButton />
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
                        {/* Add mobile menu items for unauthenticated users */}
                        {!user && navigationItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
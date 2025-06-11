"use client";

import React, { useState } from 'react'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'; // Fix: Use next/navigation instead of next/router
import { logoutAction } from '@/actions/user';
import { toast } from 'sonner'; // Fix: Import toast correctly

function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Fix: Initial state should be false

    const handleLogOut = async () => {
        setLoading(true);

        try {
            const { errorMessage } = await logoutAction();

            if (!errorMessage) {
                // Fix: Use toast correctly
                toast.success("Logout Successful", {
                    description: "You have been logged out successfully.",
                });
                router.push("/"); // Redirect to home page after logout
            } else {
                // Fix: Use toast correctly
                toast.error("Logout Failed", {
                    description: errorMessage,
                });
            }
        } catch (error) {
            toast.error("Logout Failed", {
                description: "An unexpected error occurred.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            className="w-24"
            variant="outline"
            disabled={loading}
            onClick={handleLogOut}
        >
            {loading ? <Loader2 className="animate-spin" /> : "Logout"}
        </Button>
    );
}

export default LogoutButton
"use client";

import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/actions/user';
import { toast } from 'sonner';

function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogOut = async () => {
        setLoading(true);

        try {
            const { errorMessage } = await logoutAction();

            if (!errorMessage) {
                toast.success("Logout Successful", {
                    description: "You have been logged out successfully.",
                });
                router.push("/landing"); // Redirect to landing page after logout
            } else {
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
        <button
            className="w-full text-left flex items-center gap-2"
            disabled={loading}
            onClick={handleLogOut}
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Logout</span>}
        </button>
    );
}

export default LogoutButton
import { getUser } from "@/auth/server";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { prisma } from "@/db/prisma";
import { Note } from "@prisma/client";
import Link from "next/link";
import SidebarGroupContent from "./SidebarGroupContent";

// Create a custom type for sidebar notes
type SidebarNote = Pick<Note, 'id' | 'heading' | 'createdAt' | 'updatedAt' | 'authorId' | 'coverImage'>;

/**
 * AppSidebar Component
 * 
 * Purpose: Main sidebar container that displays user's notes with navigation
 * Features:
 * - Shows all user notes in a vertical list
 * - Displays login prompt for unauthenticated users
 * - Fetches notes from database ordered by last update
 * - Integrates with Supabase authentication
 * 
 * Layout: Fixed sidebar on the left side of the application
 */
async function AppSidebar() {
    // Get the currently authenticated user from Supabase
    const user = await getUser();

    // Initialize empty notes array for type safety
    let notes: SidebarNote[] = [];

    // Only fetch notes if user is authenticated
    if (user) {
        // Fetch user's notes from database, ordered by most recently updated
        notes = await prisma.note.findMany({
            where: {
                authorId: user.id,
            },
            select: {
                id: true,
                heading: true,
                coverImage: true,
                createdAt: true,
                updatedAt: true,
                authorId: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        })
    }

    return (
        <Sidebar>
            <SidebarContent className="custom-scrollbar">
                <SidebarGroup>
                    {/* Sidebar header with conditional content based on auth status */}
                    <SidebarGroupLabel className="mb-2 mt-2 text-lg font-semibold">
                        {
                            user ? ("Your Notes") : (
                                // Show login prompt for unauthenticated users
                                <p>
                                    <Link href={"/login"} className="text-blue-500 hover:underline"> Log in</Link> to see your notes.
                                </p>
                            )
                        }
                    </SidebarGroupLabel>

                    {/* Only render notes list if user is authenticated */}
                    {user && <SidebarGroupContent notes={notes} />}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar;
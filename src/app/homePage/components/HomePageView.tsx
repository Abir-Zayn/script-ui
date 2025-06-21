import { getUser } from "@/auth/server";
import Header from "@/components/Header";
import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";
import HomePageViewClient from "./HomePageViewClient";

/**
 * HomePageView - Card-based view of all user notes
 * Features: Grid layout with note cards, new note button, search functionality
 */
async function HomePageView() {
    // Check if user is authenticated
    const user = await getUser();

    // If user is not authenticated, redirect to login page
    if (!user) {
        redirect('/login');
    }

    // If user is authenticated, fetch user's notes from database
    const notes = await prisma.note.findMany({
        where: {
            authorId: user.id,
        },
        select: {
            id: true,
            heading: true,
            text: true,
            createdAt: true,
            coverImage: true,
            authorId: true,
            updatedAt: true,
        },
        orderBy: {
            updatedAt: 'desc',
        },
    });

    return (
        <HomePageViewClient user={user} noteList={notes} />
        // <div className="min-h-screen bg-background">
        //     {/* Header - pass showSidebar=false for card view */}
        //     <Header user={user} showSidebar={false} />

        //     {/* Main content area */}
        //     <main className="container mx-auto px-4 py-8">
        //         {/* Welcome Section */}
        //         <div className="text-center mb-8">
        //             <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
        //                 Welcome back, {user.email?.split('@')[0]}!
        //             </h1>
        //             <p className="text-muted-foreground">
        //                 Manage your notes and thoughts in one place
        //             </p>
        //         </div>

        //         {/* Action Buttons - Centered */}
        //         <div className="flex justify-center mb-8">
        //             <div className="flex gap-4">
        //                 <NewNoteButton user={user} />
        //                 {/* Add other action buttons here if needed */}
        //             </div>
        //         </div>

        //         {/* Note Cards Section */}
        //         {notes.length > 0 ? (
        //             <div className="space-y-6">
        //                 <h2 className="text-2xl font-semibold text-foreground">
        //                     Your Notes ({notes.length})
        //                 </h2>

        //                 {/* Horizontal Scrollable Note Cards */}
        //                 <div className="overflow-x-auto pb-4">
        //                     <div className="flex gap-6 min-w-max">
        //                         {notes.map((note) => (
        //                             <NoteCardClient
        //                                 key={note.id}
        //                                 note={note}
        //                             />
        //                         ))}
        //                     </div>
        //                 </div>
        //             </div>
        //         ) : (
        //             // Empty State
        //             <div className="text-center py-16">
        //                 <div className="max-w-md mx-auto">
        //                     <h3 className="text-xl font-medium text-foreground mb-2">
        //                         No notes yet
        //                     </h3>
        //                     <p className="text-muted-foreground mb-6">
        //                         Create your first note to get started organizing your thoughts
        //                     </p>
        //                     <NewNoteButton user={user} />
        //                 </div>
        //             </div>
        //         )}
        //     </main>
        // </div>
    )
}

export default HomePageView
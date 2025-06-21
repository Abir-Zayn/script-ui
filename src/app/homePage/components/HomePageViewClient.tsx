'use client'

import Header from "@/components/Header";
import NewNoteButton from "@/components/NewNoteButton";
import { Note } from "@prisma/client";
import { useState } from "react";
import NoteCardClient from "./NoteCardClient";


interface HomePageViewClientProps {
    user: any;
    noteList: Pick<Note, 'id' | 'heading' | 'text' | 'createdAt' | 'coverImage' | 'updatedAt' | 'authorId'>[];
}

const HomePageViewClient = ({ user, noteList }: HomePageViewClientProps) => {
    const [notes, setNotes] = useState(noteList);

    //Handle note deletion by removing it from the local state
    const handleDeleteNote = (noteId: string) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header - pass showSidebar=false for card view */}
            <Header user={user} showSidebar={false} />

            {/* Main content area */}
            <main className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                        Welcome back, {user.email?.split('@')[0]}!
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your notes and thoughts in one place
                    </p>
                </div>
                {/* Action Buttons - Centered */}
                <div className="flex justify-center mb-8">
                    <div className="flex gap-4">
                        <NewNoteButton user={user} />
                        {/* Add other action buttons here if needed */}
                    </div>
                </div>

                {/* Note Cards Section */}
                {notes.length > 0 ? (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-foreground">
                            Your Notes ({notes.length})
                        </h2>

                        {/* Horizontal Scrollable Note Cards */}
                        <div className="overflow-x-auto pb-4">
                            <div className="flex gap-6 min-w-max">
                                {notes.map((note) => (
                                    <NoteCardClient
                                        key={note.id}
                                        note={note}
                                        onDelete={handleDeleteNote} // Pass delete handler
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) :  (
                    // Empty State
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <h3 className="text-xl font-medium text-foreground mb-2">
                                No notes yet
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Create your first note to get started organizing your thoughts
                            </p>
                            <NewNoteButton user={user} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default HomePageViewClient
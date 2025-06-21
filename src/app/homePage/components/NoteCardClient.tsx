'use client'

import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";
import NoteCard from "./noteCard";
import { useState } from "react";
import { deleteNoteAction } from "@/actions/notes";
import { Loader2 } from "lucide-react";

interface NoteCardClientProps {
    note: Pick<Note, 'id' | 'heading' | 'text' | 'createdAt' | 'coverImage' | 'updatedAt' | 'authorId'>;
    onDelete?: (noteId: string) => void; // Optional callback for delete action
}

/**
 * NoteCardClient Component - Client wrapper for note card with navigation
 * Handles click events to navigate to main dashboard with selected note
 */
const NoteCardClient = ({ note, onDelete }: NoteCardClientProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    // Navigate to main dashboard with selected note
    const handleNoteCardClick = (noteId: string) => {
        if (isDeleting) return; // Prevent navigation while deleting
        router.push(`/?noteId=${noteId}`); // Navigate to main dashboard with noteId
    };

    // Handle delete action 
    const handleDeleteNote = async (noteId: string) => {
        if (isDeleting) return; // Prevent multiple delete attempts

        setIsDeleting(true);

        try {
            const result = await deleteNoteAction(noteId);

            if (result.errorMessage) {
                console.error('Error deleting note:', result.errorMessage);
                alert('Failed to delete note. Please try again.');
            } else {
                // Call parent component's onDelete callback if provided
                if (onDelete) {
                    onDelete(noteId);
                } else {
                    // Refresh the page to update the notes list
                    router.refresh();
                }
            }
        } catch (error) {
            console.error('Error deleting note:', error);
            alert('Failed to delete note. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    // If note is being deleted, show a loading overlay
    if (isDeleting) {
        return (
            <div className="relative flex-shrink-0 w-80 rounded-lg p-6 shadow-sm border border-border bg-card opacity-50">
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">Deleting...</span>
                    </div>
                </div>
                <NoteCard
                    note={note}
                    onClick={() => { }} // Disable click while deleting
                    onDelete={() => { }} // Disable delete while deleting
                />
            </div>
        );
    }

    return (
        <NoteCard
            note={note}
            onClick={handleNoteCardClick}
            onDelete={handleDeleteNote}
        />
    )
}

export default NoteCardClient;
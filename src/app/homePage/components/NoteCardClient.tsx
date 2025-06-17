'use client'

import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";
import NoteCard from "./noteCard";

interface NoteCardClientProps {
    note: Pick<Note, 'id' | 'heading' | 'text' | 'createdAt' | 'coverImage' | 'updatedAt' | 'authorId'>;
}

/**
 * NoteCardClient Component - Client wrapper for note card with navigation
 * Handles click events to navigate to main dashboard with selected note
 */
const NoteCardClient = ({ note }: NoteCardClientProps) => {
    const router = useRouter();

    // Navigate to main dashboard with selected note
    const handleNoteCardClick = (noteId: string) => {
        router.push(`/?noteId=${noteId}`); // Navigate to main dashboard with noteId
    };

    return (
        <NoteCard
            note={note}
            onClick={handleNoteCardClick}
        />
    )
}

export default NoteCardClient;
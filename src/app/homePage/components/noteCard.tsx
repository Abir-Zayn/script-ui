import { Note } from "@prisma/client";
import { Calendar, Trash } from "lucide-react";
import React from "react";

interface NoteCardProps {
    note: Pick<Note, 'id' | 'heading' | 'text' | 'createdAt' | 'updatedAt' | 'authorId' | 'coverImage'>;
    onClick: (noteId: string) => void;
    onDelete: (noteId: string) => void;
}

/**
 * NoteCard Component - Displays individual note preview in card format
 * Features: Clickable card with heading, body preview, and creation date
 */
const NoteCard = ({ note, onClick, onDelete }: NoteCardProps) => {
    {/* Format date function */ }
    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Extract plain text from HTML content
    const extractTextPreview = (htmlContent: string, maxLength: number = 120) => {
        const div = document.createElement('div');
        div.innerHTML = htmlContent;
        const text = div.textContent || div.innerText || "";
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    // Handle the card click to navigate to note details
    const handleCardClick = () => {
        onClick(note.id);
    };

    // Handle delete action 
    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click event
        if (window.confirm("Are you sure you want to delete this note?")) {
            onDelete(note.id);
        }
    }

    return (
        <div
            onClick={handleCardClick}
            className="group relative flex-shrink-0 w-80 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 cursor-pointer border border-border bg-card"
        >
            {/* Delete button */}
            <button
                onClick={handleDeleteClick}
                className="absolute top-3 right-3 p-2 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                title="Delete note"
                aria-label="Delete note"
            >
                <Trash className="w-4 h-4" />
            </button>

            <div className="space-y-4">
                {/* Note Heading */}
                <h3 className="text-lg font-semibold text-foreground line-clamp-2 min-h-[3.5rem]">
                    {note.heading?.trim() || 'Untitled Note'}
                </h3>

                {/* Note Body */}
                <p className="text-sm text-muted-foreground line-clamp-3 min-h-[4.5rem]">
                    {extractTextPreview(note.text)}
                </p>

                {/* Note Creation Date */}
                <div className="flex items-center justify-end text-xs text-muted-foreground pt-2 border-t border-border/50">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(note.createdAt)}
                </div>
            </div>
        </div>
    )
}

export default NoteCard;
import { Note } from "@prisma/client";
import { Calendar } from "lucide-react";

interface NoteCardProps {
    note: Pick<Note, 'id' | 'heading' | 'text' | 'createdAt' | 'updatedAt' | 'authorId' | 'coverImage'>;
    onClick: (noteId: string) => void;
}


/**
 * NoteCard Component - Displays individual note preview in card format
 * Features: Clickable card with heading, body preview, and creation date
 */
const NoteCard = ({ note, onClick }: NoteCardProps) => {
    {/* Formate date function*/ }
    const formateDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Extract plain text from HTML content
    const extractTextPreview = (HtmlContent: string, maxLength: number = 120) => {
        const div = document.createElement('div');
        div.innerHTML = HtmlContent;
        const text = div.textContent || div.innerText || "";
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }


    //Handle the card click to navigate to note details
    const handleCardClick = () => {
        onClick(note.id);
    };

    return (
        <div
            onClick={handleCardClick}
            className="flex-shrink-0 w-80 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 cursor-pointer border border-border bg-card"
        >
            <div className="space-y-4">

                {/* Note Heading */}
                <h3 className="text-lg font-semibold text-foreground line-clamp-2 min-h-[3.5rem]">
                    {note.heading?.trim() || 'Untitled Note'}
                </h3>

                {/* Note Body */}
                <p className="text-sm text-muted-foreground line-clamp-3 min0-h-[4.5rem]">
                    {extractTextPreview(note.text)}
                </p>

                {/* Note Creation Date */}
                <div className="flex items-center justify-end text-xs text-muted-foreground pt-2 border-t border-border/50">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formateDate(note.createdAt)}
                </div>

            </div>

        </div>
    )
}

export default NoteCard;
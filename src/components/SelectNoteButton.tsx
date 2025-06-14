import { Note } from '@prisma/client'
import { SidebarMenuButton } from './ui/sidebar'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
    note: Pick<Note, 'id' | 'heading' | 'createdAt' | 'updatedAt' | 'authorId'>
}

/**
 * SelectNoteButton Component
 * 
 * Purpose: Individual note item button for navigation and selection
 * Features:
 * - Visual indication of currently selected note
 * - Navigation to note when clicked
 * - Displays note heading with fallback for untitled notes
 * - Shows last updated date for reference
 * - Enhanced padding for better touch targets
 */
function SelectNoteButton({ note }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Check if this note is currently selected
    const isSelected = searchParams.get('noteId') === note.id

    /**
     * Navigate to the selected note
     * Updates URL with noteId parameter
     */
    const handleClick = () => {
        router.push(`/?noteId=${note.id}`)
    }

    // Helper function to display heading with fallback for empty/null headings
    const displayHeading = note.heading?.trim() || 'Untitled Note'

    return (
        <SidebarMenuButton
            onClick={handleClick}
            className={`
                w-full justify-start text-left px-4 py-3 min-h-[60px]
                ${isSelected
                    ? 'bg-muted font-medium border-l-2 border-primary'
                    : 'hover:bg-muted/70'
                }
                transition-all duration-200 rounded-r-md
            `}
        >
            <div className="flex flex-col items-start gap-2 overflow-hidden w-full">
                {/* Note Heading */}
                <span className="truncate font-medium text-sm leading-5 w-full">
                    {displayHeading}
                </span>

                {/* Last Updated Date */}
                <span className="text-xs text-muted-foreground leading-4">
                    {new Date(note.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: new Date().getFullYear() !== new Date(note.updatedAt).getFullYear()
                            ? 'numeric'
                            : undefined
                    })}
                </span>
            </div>
        </SidebarMenuButton>
    )
}

export default SelectNoteButton
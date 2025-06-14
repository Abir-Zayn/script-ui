import { Note } from '@prisma/client'
import { SidebarMenuButton } from './ui/sidebar'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
    note: Pick<Note, 'id' | 'heading' | 'createdAt' | 'updatedAt' | 'authorId'>
}

function SelectNoteButton({ note }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const isSelected = searchParams.get('noteId') === note.id

    const handleClick = () => {
        router.push(`/?noteId=${note.id}`)
    }

    // Helper function to display heading with fallback
    const displayHeading = note.heading?.trim() || 'Untitled Note'

    return (
        <SidebarMenuButton
            onClick={handleClick}
            className={`w-full justify-start text-left ${isSelected ? 'bg-muted font-medium' : ''
                }`}
        >
            <div className="flex flex-col items-start gap-1 overflow-hidden">
                <span className="truncate font-medium text-sm">
                    {displayHeading}
                </span>
                <span className="text-xs text-muted-foreground">
                    {new Date(note.updatedAt).toLocaleDateString()}
                </span>
            </div>
        </SidebarMenuButton>
    )
}

export default SelectNoteButton
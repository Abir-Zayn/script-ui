'use client'
import { Note } from '@prisma/client'
import { SidebarGroupContent as SidebarGroupContentShadCN, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import SelectNoteButton from './SelectNoteButton';
import DeleteNoteButton from './DeleteNoteButton';

type Props = {
  notes: Pick<Note, 'id' | 'heading' | 'createdAt' | 'updatedAt' | 'authorId'>[];
}

/**
 * SidebarGroupContent Component
 * 
 * Purpose: Manages the content area of the sidebar with search and note list
 * Features:
 * - Real-time search functionality using Fuse.js for fuzzy matching
 * - Local state management for immediate UI updates
 * - Vertical list of notes with enhanced padding for better UX
 * - Delete functionality with optimistic UI updates
 * 
 * Layout: Search bar at top, followed by scrollable list of note items
 */
function SidebarGroupContent({ notes }: Props) {
  // Search input state for filtering notes
  const [searchText, setSearchText] = useState('');

  // Local notes state for immediate UI updates (optimistic updates)
  const [localNotes, setLocalNotes] = useState(notes);

  // Sync local state when props change (e.g., after database updates)
  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  // Initialize Fuse.js for fuzzy search functionality
  // Memoized to prevent recreation on every render
  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["heading"], // Search within note headings
      threshold: 0.4,    // Fuzzy matching sensitivity (0.4 = moderately fuzzy)
    })
  }, [localNotes]);

  // Filter notes based on search text
  // If no search text, show all notes; otherwise show search results
  const filteredNotes = searchText ? fuse.search(searchText)
    .map(result => result.item) : localNotes;

  /**
   * Optimistically remove note from local state
   * This provides immediate UI feedback while delete request processes
   * @param noteId - ID of the note to remove from local state
   */
  const deleteNoteLocally = (noteId: String) => {
    setLocalNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  }

  return (
    <SidebarGroupContentShadCN>
      {/* Search Input Section */}
      <div className='relative flex items-center mb-4'>
        {/* Search icon positioned absolutely within input */}
        <SearchIcon className='absolute left-3 size-4 text-muted-foreground z-10' />
        <Input
          className='bg-muted pl-10 pr-4 py-2 h-10'
          placeholder='Search notes by heading...'
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Notes List Section */}
      <SidebarMenu className='space-y-2'>
        {filteredNotes.map((note) => (
          <SidebarMenuItem
            key={note.id}
            className='group/item px-2 py-1 rounded-md hover:bg-muted/50 transition-colors duration-200'
          >
            {/* Note Selection Button - Main clickable area */}
            <div className="flex items-center w-full">
              <div className="flex-1 min-w-0"> {/* min-w-0 allows text truncation */}
                <SelectNoteButton note={note} />
              </div>

              {/* Delete Button - Shows on hover */}
              <div className="ml-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                <DeleteNoteButton
                  noteId={note.id}
                  deleteNoteLocally={deleteNoteLocally}
                />
              </div>
            </div>
          </SidebarMenuItem>
        ))}

        {/* Empty State Message */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchText ? (
              <p>No notes found matching "{searchText}"</p>
            ) : (
              <p>No notes yet. Create your first note!</p>
            )}
          </div>
        )}
      </SidebarMenu>
    </SidebarGroupContentShadCN>
  )
}

export default SidebarGroupContent
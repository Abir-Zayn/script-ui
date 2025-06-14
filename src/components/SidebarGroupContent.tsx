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

function SidebarGroupContent({ notes }: Props) {
  const [searchText, setSearchText] = useState('');
  const [localNotes, setLocalNotes] = useState(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["heading"],
      threshold: 0.4,
    })
  }, [localNotes]);

  const filteredNotes = searchText ? fuse.search(searchText)
    .map(result => result.item) : localNotes;

  const deleteNoteLocally = (noteId: String) => {
    setLocalNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  }

  return <SidebarGroupContentShadCN>
    <div className='relative flex items-center'>
      <SearchIcon className='absolute left-2 size-2' />
      <Input
        className='bg-muted pl-8'
        placeholder='Search notes by heading...'
        type='text'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>

    <SidebarMenu className='mt-4'>
      {filteredNotes.map((note) => (
        <SidebarMenuItem key={note.id} className='group/item'>
          <SelectNoteButton note={note}></SelectNoteButton>
          <DeleteNoteButton noteId={note.id}
            deleteNoteLocally={deleteNoteLocally}
          ></DeleteNoteButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>

  </SidebarGroupContentShadCN>
}

export default SidebarGroupContent
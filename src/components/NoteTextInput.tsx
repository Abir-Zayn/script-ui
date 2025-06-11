'use client'

import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { debounceTimeOut } from "@/lib/constants";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/actions/notes";

type Props = {
    noteId: string;
    startingNoteText: string;
}

let updateTimeout: NodeJS.Timeout;


function NoteTextInput({ noteId, startingNoteText }: Props) {
    const noteIdParam = useSearchParams().get("noteId") || "";
    const { noteText, setnoteText } = useNote();

    useEffect(() => {
        // Fix: Always sync the noteText when noteId or startingNoteText changes
        // This ensures the textarea shows the correct content for the current note
        if (noteIdParam === noteId) {
            setnoteText(startingNoteText);
        }
    }, [startingNoteText, noteIdParam, noteId, setnoteText]);

    const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setnoteText(text);

        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            // Only update if we have a valid noteId
            if (noteId && noteId.trim() !== "") {
                updateNoteAction(noteId, text);
            }
        }, debounceTimeOut);
    }

    return (
        <Textarea
            value={noteText}
            onChange={handleUpdateNote}
            placeholder="Type your note here..."
            className="h-full w-full resize-none border-0 bg-transparent p-0 text-lg font-normal focus:ring-0 focus-visible:ring-0"
        />
    )
}

export default NoteTextInput
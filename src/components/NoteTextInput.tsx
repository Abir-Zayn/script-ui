'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { debounceTimeOut } from "@/lib/constants";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/actions/notes";
import { formatNoteContent, parseNoteContent } from "@/lib/parsenoteContent";
import NoteHeadingInput from "./NoteHeadingInput";
import TiptapEditor from "./TiptapEditor";

type Props = {
    noteId: string;
    startingNoteText: string;
}

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText }: Props) {
    const noteIdParam = useSearchParams().get("noteId") || "";
    const { noteText, setnoteText } = useNote();

    // Parse the noteContent into heading and body
    const parsedContent = parseNoteContent(startingNoteText);
    const [heading, setHeading] = useState(parsedContent.heading);
    const [bodyText, setBodyText] = useState(parsedContent.body);

    useEffect(() => {
        // Sync the noteText when noteId or startingNoteText changes
        if (noteIdParam === noteId) {
            const parsed = parseNoteContent(startingNoteText);
            setHeading(parsed.heading);
            setBodyText(parsed.body);
            setnoteText(startingNoteText);
        }
    }, [startingNoteText, noteIdParam, noteId, setnoteText]);

    /**
     * Handles updates to the note heading
     * Combines heading and body, then triggers save
     */
    const handleHeadingChange = (newHeading: string) => {
        setHeading(newHeading);
        const fullText = formatNoteContent(newHeading, bodyText);
        setnoteText(fullText);
        debouncedSave(fullText);
    };

    /**
     * Handles updates to the note body content
     * Combines heading and body, then triggers save
     */
    const handleBodyChange = (newBody: string) => {
        setBodyText(newBody);
        const fullText = formatNoteContent(heading, newBody);
        setnoteText(fullText);
        debouncedSave(fullText);
    };

    /**
     * Debounced save function to prevent excessive API calls
     */
    const debouncedSave = (text: string) => {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            if (noteId && noteId.trim() !== "") {
                updateNoteAction(noteId, text);
            }
        }, debounceTimeOut);
    };

    return (
        <div className="h-full w-full flex flex-col space-y-4">
            {/* NoteHeadingInput: Provides input field for note title/heading */}
            <NoteHeadingInput
                value={heading}
                onChange={handleHeadingChange}
                placeholder="Note title..."
            />

            {/* TiptapEditor: Provides rich text editor with real-time formatting */}
            <div className="flex-1">
                <TiptapEditor
                    value={bodyText}
                    onChange={handleBodyChange}
                    placeholder="Start writing your note..."
                />
            </div>
        </div>
    );
}

export default NoteTextInput;
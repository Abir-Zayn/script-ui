'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { debounceTimeOut } from "@/lib/constants";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/actions/notes";
import NoteHeadingInput from "./NoteHeadingInput";
import TiptapEditor from "./TiptapEditor";

type Props = {
    noteId: string; // Unique identifier for the note
    startingNoteText: string;
    startingNoteHeading?: string;
    loggedInUserEmail?: string; // Added user email prop
    updatedDate?: Date | string; // Added updated date prop

}

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({
    noteId,
    startingNoteText,
    startingNoteHeading = "",
    loggedInUserEmail,
    updatedDate }: Props) {
    const noteIdParam = useSearchParams().get("noteId") || "";
    const { noteText, setnoteText } = useNote();

    // Parse the noteContent into heading and body
    // const parsedContent = parseNoteContent(startingNoteText);
    const [heading, setHeading] = useState(startingNoteHeading); // Use startingNoteHeading if provided
    const [bodyText, setBodyText] = useState(startingNoteText);

    useEffect(() => {
        // Sync the noteText when noteId or startingNoteText changes
        if (noteIdParam === noteId || !noteIdParam) {
            setHeading(startingNoteHeading);
            setBodyText(startingNoteText);
            setnoteText(startingNoteText);
        }
    }, [startingNoteText, startingNoteHeading, noteIdParam, noteId, setnoteText]);

    /**
     * Handles updates to the note heading
     * Combines heading and body, then triggers save
     */
    const handleHeadingChange = (newHeading: string) => {
        setHeading(newHeading);
        debouncedSave(newHeading, bodyText);
    };

    /**
     * Handles updates to the note body content
     * Combines heading and body, then triggers save
     */
    const handleBodyChange = (newBody: string) => {
        setBodyText(newBody);
        setnoteText(newBody);
        debouncedSave(heading, newBody);
    };

    /**
     * Debounced save function to prevent excessive API calls
     */
    const debouncedSave = (currentHeading: string, currentText: string) => {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            if (noteId && noteId.trim() !== "") {
                updateNoteAction(noteId, currentHeading, currentText);
            }
        }, 1000); //debounce time of 1000ms (1 second)
    };

    return (
        <div className="h-full w-full flex flex-col space-y-6">
            {/* NoteHeadingInput: Provides input field for note title/heading */}
            <NoteHeadingInput
                value={heading}
                onChange={handleHeadingChange}
                placeholder="Note title..."
                loggedInUserEmail={loggedInUserEmail}
                updatedDate={updatedDate}
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
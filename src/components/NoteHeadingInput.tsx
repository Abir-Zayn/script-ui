'use client'

import { ChangeEvent } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

/**
 * NoteHeadingInput Component
 * 
 * Purpose: Provides a dedicated input field for note headings/titles
 * Features:
 * - Large, prominent text styling for headings
 * - Auto-resize based on content
 * - Clean design with outline border
 * 
 * Usage: Used in NoteTextInput to capture and display note titles
 */
function NoteHeadingInput({ value, onChange, placeholder = "Note title..." }: Props) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md outline-none text-2xl font-bold text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200 px-4 py-5"
            style={{
                minHeight: '2.5rem',
                lineHeight: '1.2'
            }}
        />
    );
}

export default NoteHeadingInput;

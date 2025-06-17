'use client'

import { ChangeEvent } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    loggedInUserEmail?: string;
    updatedDate?: Date | string; // Accept both Date and string for flexibility
}

/**
 * NoteHeadingInput Component
 * 
 * Purpose: Provides a dedicated input field for note headings/titles
 * Features:
 * - Large, prominent text styling for headings
 * - Auto-resize based on content
 * - Clean design with outline border
 * - Real-time date formatting for better readability
 * - Shows current logged-in user as author
 * 
 * Usage: Used in NoteTextInput to capture and display note titles
 */
function NoteHeadingInput({
    value,
    onChange,
    placeholder = "Note title...",
    loggedInUserEmail,
    updatedDate
}: Props) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    /**
     * Format date for better readability
     * Converts Date object or ISO string to a human-readable format
     */
    const formatDate = (date: Date | string | undefined): string => {
        if (!date) {
            return new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        const dateObj = date instanceof Date ? date : new Date(date);

        // Check if date is valid
        if (isNaN(dateObj.getTime())) {
            return new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    /**
     * Get relative time (e.g., "2 minutes ago", "1 hour ago")
     * Provides more intuitive time display for recent updates
     */
    const getRelativeTime = (date: Date | string | undefined): string => {
        if (!date) return 'Just now';

        const dateObj = date instanceof Date ? date : new Date(date);

        if (isNaN(dateObj.getTime())) return 'Just now';

        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

        // For older dates, show the formatted date
        return formatDate(date);
    };

    return (
        <div className="space-y-3">
            {/* Author Information */}
            <div className="flex items-center text-sm text-muted-foreground">
                <span className="font-medium">Author</span>
                <span className="mx-2">›</span>
                <span className="text-foreground font-medium">
                    {loggedInUserEmail || 'Unknown User'}
                </span>
            </div>

            {/* Note Title Input */}
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full bg-transparent border-0 outline-none text-2xl lg:text-3xl font-bold text-foreground placeholder:text-muted-foreground focus:ring-0 transition-colors duration-200 px-0 py-2"
                style={{
                    minHeight: '2.5rem',
                    lineHeight: '1.2'
                }}
            />

            {/* Updated Date Information */}
            <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                    <span className="font-medium">Updated</span>
                    <span className="mx-2">›</span>
                    <span title={formatDate(updatedDate)}>
                        {getRelativeTime(updatedDate)}
                    </span>
                </div>

                {/* Full date on hover - shown as tooltip */}
                <div className="hidden sm:block text-xs opacity-70">
                    {formatDate(updatedDate)}
                </div>
            </div>
        </div>
    );
}

export default NoteHeadingInput;
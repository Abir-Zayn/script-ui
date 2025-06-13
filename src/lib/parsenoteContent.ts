/**
 * Note Utility Functions
 * 
 * Purpose: Handle parsing and formatting of note content
 * Features:
 * - Separate heading from body content
 * - Combine heading and body into formatted text
 * - Support for structured note format with HTML content
 */

export interface ParsedNote {
    heading: string;
    body: string;
}

/**
 * Parses note content into heading and body sections
 * Assumes first line is heading, rest is body
 */
export function parseNoteContent(content: string): ParsedNote {
    if (!content) {
        return { heading: '', body: '' };
    }

    // Split on first newline
    const firstNewlineIndex = content.indexOf('\n');

    // If there's no newline, assume it's all heading
    if (firstNewlineIndex === -1) {
        return { heading: content, body: '' };
    }

    const heading = content.substring(0, firstNewlineIndex);
    const body = content.substring(firstNewlineIndex + 1).trim();

    return { heading, body };
}

/**
 * Formats heading and body into a single note content string
 * Combines with proper line breaks for storage
 */
export function formatNoteContent(heading: string, body: string): string {
    if (!heading && !body) {
        return '';
    }

    if (!heading) {
        return body;
    }

    if (!body) {
        return heading;
    }

    return `${heading}\n${body}`;
}
'use server';

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const updateNoteAction = async (noteId: string, heading: string, text: string) => {
    try {
        const user = await getUser();
        if (!user) {
            throw new Error('User not authenticated');
        }

        console.log('Upserting note:', { noteId, heading, text: text.substring(0, 50) + '...' });

        const note = await prisma.note.upsert({
            where: {
                id: noteId,
            },
            update: {
                heading: heading.trim() || null,
                text: text,
                updatedAt: new Date()
            },
            create: {
                id: noteId,
                authorId: user.id,
                heading: heading.trim() || null,
                text: text
            }
        });

        console.log('Note upserted successfully:', note.id);
        return { errorMessage: null };
    } catch (error) {
        console.error('Error upserting note:', error);
        return handleError(error);
    }
}

export const createNoteAction = async (noteId: string) => {
    try {
        const user = await getUser();
        if (!user) {
            throw new Error('User not authenticated');
        }
        // Update the note in the database
        await prisma.note.create({
            data: {
                id: noteId,
                authorId: user.id,
                heading: null, // Start with no heading
                text: "",
            },
        });

        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}

export const deleteNoteAction = async (noteId: string) => {
    try {
        const user = await getUser();
        if (!user) {
            throw new Error('User not authenticated to delete note');
        }
        // Update the note in the database
        await prisma.note.delete({
            where: {
                id: noteId,
                authorId: user.id, // Ensure user owns the note
            },
        });

        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}


'use server';

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const updateNoteAction = async (noteId: string, text: string) => {
    try {
        const user = await getUser();
        if (!user) {
            throw new Error('User not authenticated');
        }

        // Log for debugging
        console.log('Updating note:', { noteId, text: text.substring(0, 50) + '...' });

        // Update the note in the database
        const updatedNote = await prisma.note.update({
            where: {
                id: noteId,
                authorId: user.id // Ensure user owns the note
            },
            data: { text },
        });

        console.log('Note updated successfully:', updatedNote.id);
        return { errorMessage: null };
    } catch (error) {
        console.error('Error updating note:', error);
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


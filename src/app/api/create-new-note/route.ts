import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId") || "";

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Check if user exists first
        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!userExists) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const { id } = await prisma.note.create({
            data: {
                authorId: userId,
                heading: null,
                text: "",
                coverImage: null, // Add the missing coverImage field
            },
        });

        return NextResponse.json({
            noteId: id,
        });
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json(
            { error: "Failed to create note" },
            { status: 500 }
        );
    }
}
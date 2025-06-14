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

        const { id } = await prisma.note.create({
            data: {
                authorId: userId,
                heading: null, // Add this missing field
                text: "",
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
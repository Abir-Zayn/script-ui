import { getUser } from "@/auth/server";
import AskAiButton from "@/components/AskAiButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import { prisma } from "@/db/prisma";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function HomePage({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();

  const noteId = Array.isArray(noteIdParam) ? noteIdParam![0] : noteIdParam || "";

  // Only query the database if we have a valid noteId
  let note = null;
  if (noteId && noteId.trim() !== "" && user) {
    try {
      note = await prisma.note.findUnique({
        where: {
          id: noteId,
          authorId: user.id,
        },
        select: {
          id: true,
          heading: true,
          text: true,
          createdAt: true,
          updatedAt: true,
        }
      });
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  }

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAiButton user={user} />
        <NewNoteButton user={user} />
      </div>
      {/* Only render NoteTextInput if we have a noteId */}
      {noteId && noteId.trim() !== "" ? (
        <NoteTextInput
          noteId={noteId}
          startingNoteText={note?.text || ""}
          startingNoteHeading={note?.heading || ""}
        />
      ) : (
        <div className="flex h-full w-full max-w-4xl items-center justify-center text-muted-foreground">
          <p>Create a new note to get started</p>
        </div>
      )}
    </div>
  )
}

export default HomePage;
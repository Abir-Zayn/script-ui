import { getUser } from "@/auth/server";
import AskAiButton from "@/components/AskAiButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import SelectNoteButton from "@/components/SelectNoteButton";
import Header from "@/components/Header";
import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * RootPage - Main dashboard with sidebar navigation
 * Features:
 * - Sidebar with all user notes
 * - Main content area for note editing
 * - Proper routing integration
 * - SidebarProvider wrapper for sidebar functionality
 */
async function RootPage({ searchParams }: Props) {
  const user = await getUser();

  // if there is no logged in user, redirect to landing page
  if (!user) {
    redirect("/landing");
  }

  const params = await searchParams;
  const noteIdParam = params.noteId;
  const noteId = Array.isArray(noteIdParam) ? noteIdParam[0] : noteIdParam || "";

  // Fetch all user notes for sidebar
  const userNotes = await prisma.note.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      heading: true,
      text: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
      coverImage: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  // If no noteId provided but user has notes, redirect to newest note
  if (!noteId && userNotes.length > 0) {
    redirect(`/?noteId=${userNotes[0].id}`);
  }

  // Fetch the selected note if noteId is provided
  let selectedNote = null;
  if (noteId && noteId.trim() !== "" && user) {
    try {
      selectedNote = await prisma.note.findUnique({
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
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        {/* Header with sidebar support */}
        <Header user={user} showSidebar={true} />

        <div className="flex h-[calc(100vh-80px)]">
          {/* Sidebar */}
          <Sidebar className="w-80 border-r border-border">
            <SidebarContent className="p-4 space-y-4">
              {/* Action Buttons */}
              <div className="space-y-2">
                <NewNoteButton user={user} />
                <AskAiButton user={user} />
              </div>

              {/* Notes List */}
              <SidebarMenu>
                {userNotes.length > 0 ? (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Your Notes ({userNotes.length})
                    </h3>
                    {userNotes.map((note) => (
                      <SidebarMenuItem key={note.id}>
                        <SelectNoteButton note={note} />
                      </SidebarMenuItem>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-sm">
                      No notes yet. Create your first note!
                    </p>
                  </div>
                )}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main Content Area */}
          <main className="flex-1 overflow-hidden">
            {selectedNote ? (
              <div className="h-full p-6">
                <Suspense fallback={<div>Loading note...</div>}>
                  <NoteTextInput
                    noteId={selectedNote.id}
                    startingNoteText={selectedNote.text || ""}
                    startingNoteHeading={selectedNote.heading || ""}
                    loggedInUserEmail={user.email}
                    updatedDate={selectedNote.updatedAt}
                  />
                </Suspense>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Welcome to your Notes
                  </h2>
                  <p className="text-muted-foreground">
                    Select a note from the sidebar or create a new one to get started
                  </p>
                  <div className="flex gap-2 justify-center">
                    <NewNoteButton user={user} />
                    <AskAiButton user={user} />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default RootPage;
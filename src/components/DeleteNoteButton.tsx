'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { deleteNoteAction } from "@/actions/notes";


type Props = {
    noteId: string;
    deleteNoteLocally: (noteId: string) => void;
}

function DeleteNoteButton({ noteId, deleteNoteLocally }: Props) {
    const router = useRouter();
    const noteIdParam = useSearchParams().get("noteId") || "";


    const [isPending, startTransition] = useTransition();

    const handleDeleteNote = () => {
        startTransition(async () => {
            const { errorMessage } = await deleteNoteAction(noteId);
            if (!errorMessage) {
                toast.info("Note deleted successfully", {
                    description: "The note has been removed from your list.",
                });
            }
            deleteNoteLocally(noteId);

            if (noteId === noteIdParam) {
                // If the deleted note was the current one, redirect to home
                router.replace("/");
            } else {
                toast.error("Failed to delete note", {
                    description: "An error occurred while deleting the note.",
                });
            }
        })
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="size-7 p-0 [&_svg]:size-3"
                    variant="ghost"
                >
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure that you want to Delete it ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteNote}
                        className="bg-red-500 hover:bg-red-600 text-white"
                    >{
                            isPending ? <Loader2 className="animate-spin" /> : "Delete"
                        }</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteNoteButton;


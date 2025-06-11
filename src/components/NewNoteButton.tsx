'use client'
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner"
import { createNoteAction } from "@/actions/notes"

type Props = {
    user: User | null
}

function NewNoteButton({ user }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    const handleClickNewNoteButton = async () => {
        if (!user) {
            router.push("/login");
        } else {
            setLoading(true);
            const uuid = uuidv4();

            try {
                const { errorMessage } = await createNoteAction(uuid);

                if (!errorMessage) {
                    // Fix: Remove the extra "/" before UUID
                    router.push(`/?noteId=${uuid}`); 
                    toast.success("New note created successfully", {
                        description: "You can start writing your note now.",
                    });
                } else {
                    toast.error("Failed to create note", {
                        description: errorMessage
                    });
                }
            } catch (error) {
                toast.error("Failed to create note");
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <Button
            onClick={handleClickNewNoteButton}
            variant="secondary"
            className="w-24"
            disabled={loading}
        >
            {loading ? <Loader2 className="animate-spin" /> : "New Note"}
        </Button>
    )
}

export default NewNoteButton
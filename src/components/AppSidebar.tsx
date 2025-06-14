import { getUser } from "@/auth/server";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { prisma } from "@/db/prisma";
import { Note } from "@prisma/client";
import Link from "next/link";
import SidebarGroupContent from "./SidebarGroupContent";

async function AppSidebar() {
    const user = await getUser();
    let notes: Pick<Note, 'id' | 'heading' | 'createdAt' | 'updatedAt' | 'authorId'>[] = [];

    if (user) {
        notes = await prisma.note.findMany({
            where: {
                authorId: user.id,
            },
            select: {
                id: true,
                heading: true,
                createdAt: true,
                updatedAt: true,
                authorId: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        })
    }

    return (
        <Sidebar>
            <SidebarContent className="custom-scrollbar">
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-2 mt-2 text-lg font-semibold">
                        {
                            user ? ("Your Notes") : (
                                <p>
                                    <Link href={"/login"} className="text-blue-500 hover:underline"> Log in</Link> to see your notes.
                                </p>
                            )
                        }
                    </SidebarGroupLabel>
                    {user && <SidebarGroupContent notes={notes} />}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar;
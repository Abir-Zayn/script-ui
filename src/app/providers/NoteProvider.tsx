'use client'

import { createContext, useState } from "react";

type NoteProviderContextType = {
    noteText: string;
    setnoteText: (noteText: string) => void;
}

export const NoteProviderContext = createContext<NoteProviderContextType>({
    noteText: "",
    setnoteText: () => { }
});

function NoteProvider({ children }: { children: React.ReactNode }) {
    const [noteText, setnoteText] = useState("");

    return (
        <NoteProviderContext.Provider value={{ noteText, setnoteText }}>
            {children}
        </NoteProviderContext.Provider>
    );
}
export default NoteProvider;
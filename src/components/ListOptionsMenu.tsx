'use client'

import { Editor } from '@tiptap/react'
import { List, ListOrdered, CheckSquare, ChevronDown, Indent, Outdent } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'

type ListOptionsMenuProps = {
    editor: Editor
}

/**
 * ListOptionsMenu Component
 * 
 * Purpose: Provides a dropdown menu for list-related operations
 * Features:
 * - Toggle between different list types (bullet, ordered, task)
 * - Controls for indentation of list items
 * - Quick access to all list-related commands
 */
export default function ListOptionsMenu({ editor }: ListOptionsMenuProps) {
    const isListActive = editor.isActive('bulletList') ||
        editor.isActive('orderedList') ||
        editor.isActive('taskList')

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 flex items-center gap-1 ${isListActive ? 'bg-muted' : ''}`}
                >
                    <span className="sr-only">List options</span>
                    {editor.isActive('bulletList') && <List className="h-4 w-4" />}
                    {editor.isActive('orderedList') && <ListOrdered className="h-4 w-4" />}
                    {editor.isActive('taskList') && <CheckSquare className="h-4 w-4" />}
                    {!isListActive && <List className="h-4 w-4" />}
                    <ChevronDown className="h-3 w-3" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-muted' : ''}
                >
                    <List className="h-4 w-4 mr-2" />
                    Bullet List
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-muted' : ''}
                >
                    <ListOrdered className="h-4 w-4 mr-2" />
                    Numbered List
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    className={editor.isActive('taskList') ? 'bg-muted' : ''}
                >
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Task List
                </DropdownMenuItem>

                {isListActive && (
                    <>
                        <hr className="my-1" />
                        <DropdownMenuItem onClick={() => editor.chain().focus().sinkListItem('listItem').run()}>
                            <Indent className="h-4 w-4 mr-2" />
                            Indent
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => editor.chain().focus().liftListItem('listItem').run()}>
                            <Outdent className="h-4 w-4 mr-2" />
                            Outdent
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
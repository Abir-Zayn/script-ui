'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import {
    Bold,
    Italic,
    Underline as UnderlineIcon
} from 'lucide-react'
import { Button } from './ui/button'
import { useEffect } from 'react'
import ListOptionsMenu from './ListOptionsMenu'

type Props = {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

/**
 * TiptapEditor Component
 * 
 * Purpose: Provides a WYSIWYG rich text editor with real-time formatting
 * Features:
 * - Bold, italic, and underline formatting with visual feedback
 * - Bullet lists and ordered lists
 * - Todo/checkbox lists for task management
 * - Real-time formatting preview as you type
 * - Clean, minimal UI with formatting toolbar
 */
export default function TiptapEditor({ value, onChange, placeholder = 'Start writing...' }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                orderedList: {
                    HTMLAttributes: {
                        class: 'ordered-list',
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'bullet-list',
                    },
                },
            }),
            Underline,
            TaskList.configure({
                HTMLAttributes: {
                    class: 'task-list',
                },
            }),
            TaskItem.configure({
                nested: true,
                HTMLAttributes: {
                    class: 'task-item',
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert focus:outline-none min-h-[200px] max-w-none p-4 [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:ml-6 [&_ul]:ml-6',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })


    // Sync editor content when value prop changes
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value)
        }
    }, [editor, value])

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-col border rounded-md">
            <div className="flex items-center border-b p-2 gap-1 flex-wrap">
                {/* Text formatting section */}
                <div className="flex items-center mr-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-muted' : ''}`}
                        title="Bold (Ctrl+B)"
                    >
                        <Bold className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-muted' : ''}`}
                        title="Italic (Ctrl+I)"
                    >
                        <Italic className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('underline') ? 'bg-muted' : ''}`}
                        title="Underline (Ctrl+U)"
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </Button>
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-border mx-1"></div>

                {/* Lists section with dropdown */}
                <ListOptionsMenu editor={editor} />
            </div>

            <EditorContent
                editor={editor}
                className="flex-1"
            />
        </div>
    )
}
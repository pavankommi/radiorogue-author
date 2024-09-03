"use client";
import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Code from '@tiptap/extension-code';
import Blockquote from '@tiptap/extension-blockquote';
import OrderedList from '@tiptap/extension-ordered-list';
import CodeBlock from '@tiptap/extension-code-block';
import { TipTapEditorProps } from '../types/types';

// Define a type for editor actions
type EditorAction = 'toggleBold' | 'toggleItalic' | 'toggleUnderline' | 'toggleCode' | 'toggleBlockquote' | 'toggleOrderedList' | 'toggleCodeBlock';

const TipTapEditor: React.FC<TipTapEditorProps> = ({ content, setContent }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Underline,
            Code,
            Blockquote,
            OrderedList,
            CodeBlock,
        ],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) {
        return null;
    }

    // Define a mapping for editor actions to commands
    const actionMap: Record<EditorAction, () => void> = {
        toggleBold: () => editor.chain().focus().toggleBold().run(),
        toggleItalic: () => editor.chain().focus().toggleItalic().run(),
        toggleUnderline: () => editor.chain().focus().toggleUnderline().run(),
        toggleCode: () => editor.chain().focus().toggleCode().run(),
        toggleBlockquote: () => editor.chain().focus().toggleBlockquote().run(),
        toggleOrderedList: () => editor.chain().focus().toggleOrderedList().run(),
        toggleCodeBlock: () => editor.chain().focus().toggleCodeBlock().run(),
    };

    const buttonConfig = [
        { action: 'toggleBold' as EditorAction, label: 'Bold', isActive: editor.isActive('bold') },
        { action: 'toggleItalic' as EditorAction, label: 'Italic', isActive: editor.isActive('italic') },
        { action: 'toggleUnderline' as EditorAction, label: 'Underline', isActive: editor.isActive('underline') },
        { action: 'toggleCode' as EditorAction, label: 'Code', isActive: editor.isActive('code') },
        { action: 'toggleBlockquote' as EditorAction, label: 'Blockquote', isActive: editor.isActive('blockquote') },
        { action: 'toggleOrderedList' as EditorAction, label: 'OL', isActive: editor.isActive('orderedList') },
        { action: 'toggleCodeBlock' as EditorAction, label: 'Code Block', isActive: editor.isActive('codeBlock') },
    ];

    return (
        <div className="mt-7">
            <h2 className="text-2xl font-bold text-black mb-4">Blog Content Editor</h2>
            <div className="mb-4">
                <div className="flex space-x-2 mb-2">
                    {buttonConfig.map(({ action, label, isActive }) => (
                        <button
                            key={action}
                            onClick={() => actionMap[action as EditorAction]()}
                            className={`px-3 py-1 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <div className="border border-gray-300 p-6 min-h-[500px] text-black bg-white">
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
};

export default TipTapEditor;

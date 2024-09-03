"use client";
import React from 'react';
import { ContentBlock, Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

interface DraftEditorProps {
    editorState: EditorState;
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const DraftEditor: React.FC<DraftEditorProps> = ({ editorState, setEditorState, setTitle }) => {
    const handleKeyCommand = (command: string) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const toggleBlockType = (blockType: string) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const toggleInlineStyle = (inlineStyle: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const blockStyleFn = (block: ContentBlock): string => {
        switch (block.getType()) {
            case 'blockquote':
                return 'pl-2 border-l-2 border-gray-300';
            default:
                return '';
        }
    };

    const currentInlineStyle = editorState.getCurrentInlineStyle();
    const currentBlockType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType();

    const INLINE_STYLES = [
        { label: 'Bold', style: 'BOLD' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' },
        { label: 'Code', style: 'CODE' },
    ];

    const BLOCK_TYPES = [
        { label: 'Blockquote', style: 'blockquote' },
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' },
        { label: 'Code Block', style: 'code-block' },
    ];

    // Reference to the editor to programmatically focus on it
    const editorRef = React.useRef<Editor | null>(null);

    return (
        <div className='mt-7'>
            <h2 className="text-2xl font-bold text-black mb-4">Blog Content Editor</h2>
            <div className="mb-2">
                <div className="inline-flex space-x-4">
                    {INLINE_STYLES.map(({ label, style }) => (
                        <span
                            key={style}
                            className={`cursor-pointer ${currentInlineStyle.has(style) ? 'text-blue-500' : 'text-gray-500'}`}
                            onClick={() => toggleInlineStyle(style)}
                        >
                            {label}
                        </span>
                    ))}
                </div>
                <div className="mt-2 inline-flex space-x-4">
                    {BLOCK_TYPES.map(({ label, style }) => (
                        <span
                            key={style}
                            className={`cursor-pointer ${currentBlockType === style ? 'text-blue-500' : 'text-gray-500'}`}
                            onClick={() => toggleBlockType(style)}
                        >
                            {label}
                        </span>
                    ))}
                </div>
            </div>
            <div
                className="border border-gray-300 p-4 min-h-[400px] text-black cursor-text"
                onClick={() => editorRef.current && editorRef.current.focus()} // Focus the editor on click, if ref is not null
            >
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    blockStyleFn={blockStyleFn}
                    onChange={setEditorState}
                />
            </div>
        </div>
    );
};

export default DraftEditor;

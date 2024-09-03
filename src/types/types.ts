// src/types/types.ts

import { Dispatch, SetStateAction } from 'react';

export interface TipTapEditorProps {
    content: string;  // The HTML content to initialize the editor with
    setContent: Dispatch<SetStateAction<string>>;  // Function to update the content
}

export interface Link {
    url: string;
    text: string;
}

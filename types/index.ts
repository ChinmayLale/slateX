// src/types/notion.ts
"use client"; // THIS IS REQUIRED
export enum BlockType {
   TEXT = "TEXT",
   HEADING = "HEADING",
   TODO = "TODO",
   BULLET_LIST = "BULLET_LIST",
   NUMBERED_LIST = "NUMBERED_LIST",
   IMAGE = "IMAGE",
   CODE = "CODE",
   TABLE = "TABLE",
   QUOTE = "QUOTE",
}

export interface Block {
   id: string;
   type: BlockType;
   content: JSON; // JSON, can refine this type later
   order: number;
   pageId: string;
}

export interface Page {
   id: string;
   title: string;
   createdAt: string;  // ISO Date from backend
   updatedAt: string;
   documentId?: string | null;
   content?: string; // JSON, can refine this type later
   blocks: Block[];
   isArchived: boolean;
   coverImage?: string;
   icon?: string;
   isPublished: boolean;
}

export interface Document {
   id: string;
   title: string;
   createdAt: string;
   updatedAt: string;
   userId: string;
   isPublished: boolean;
   isArchived: boolean;
   pages: Page[];
}

export interface User {
   id: string;
   name: string;
   email: string;
}
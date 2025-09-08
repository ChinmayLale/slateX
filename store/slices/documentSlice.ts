"use client"; // THIS IS REQUIRED
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document, Page } from "@/types/index";

interface DocumentState {
   documents: Document[];
   loading: boolean;
   error: string | null;
}

const initialState: DocumentState = {
   documents: [],
   loading: false,
   error: null,
};

const documentSlice = createSlice({
   name: "documents",
   initialState,
   reducers: {
      setDocuments: (state, action: PayloadAction<Document[]>) => {
         state.documents = action.payload;
      },
      addDocument: (state, action: PayloadAction<Document>) => {
         state.documents.push(action.payload);
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload;
      },
      setError: (state, action: PayloadAction<string | null>) => {
         state.error = action.payload;
      },

      addPageToCurrentDocumentReducer: (
         state,
         action: PayloadAction<{ documentId: string; page: Page }>
      ) => {
         const { documentId, page } = action.payload;
         const documentIndex = state.documents.findIndex(doc => doc.id === documentId);
         if (documentIndex !== -1) {
            state.documents[documentIndex].pages.push(page);
         } else {
            console.warn("Document not found:", documentId);
         }
      }

   },
});

export const { setDocuments, setLoading, setError, addDocument, addPageToCurrentDocumentReducer } = documentSlice.actions;
export default documentSlice.reducer;

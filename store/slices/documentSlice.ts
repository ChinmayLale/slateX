"use client"; // THIS IS REQUIRED
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document, Page } from "@/types/index";

interface DocumentState {
   documents: Document[];
   loading: boolean;
   error: string | null;
   trashDocuments: Document[]
}

const initialState: DocumentState = {
   documents: [],
   loading: false,
   error: null,
   trashDocuments: []
};

const documentSlice = createSlice({
   name: "documents",
   initialState,
   reducers: {
      setDocuments: (state, action: PayloadAction<Document[]>) => {
         state.documents = action.payload;
      },

      addDocuments: (state, action: PayloadAction<Document[]>) => {
         state.documents = [...state.documents, ...action.payload];
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
      },

      archiveDocumentByIdReducer: (state, action: PayloadAction<string>) => {
         const documentId = action.payload;
         const documentIndex = state.documents.findIndex(doc => doc.id === documentId);
         if (documentIndex !== -1) {
            state.documents[documentIndex].isArchived = true;
            const currentDocument = state.documents[documentIndex];
            state.trashDocuments.push(currentDocument);
         } else {
            console.warn("Document not found:", documentId);
            return;
         }
      },

      restoreDocumentFromArchiveReducer: (state, action: PayloadAction<string>) => {
         const documentId = action.payload;
         const documentIndex = state.trashDocuments.findIndex(doc => doc.id === documentId);
         if (documentIndex !== -1) {
            state.trashDocuments[documentIndex].isArchived = false;
            const currentDocument = state.trashDocuments[documentIndex];
            state.documents.push(currentDocument);
         } else {
            console.warn("Document not found:", documentId);
            return;
         }
      },

      setArchievedDocuments: (state, action: PayloadAction<Document[]>) => {
         state.trashDocuments = action.payload;
      },

      deleteDocumentFromArchiveReducer: (state, action: PayloadAction<string>) => {
         const documentId = action.payload;
         const documentIndex = state.trashDocuments.findIndex(doc => doc.id === documentId);
         if (documentIndex !== -1) {
            state.trashDocuments.splice(documentIndex, 1);
         } else {
            console.warn("Document not found:", documentId);
            return;
         }
      },

   },
});

export const { setDocuments, setLoading, setError, addDocument, addPageToCurrentDocumentReducer, archiveDocumentByIdReducer, addDocuments, restoreDocumentFromArchiveReducer, setArchievedDocuments, deleteDocumentFromArchiveReducer } = documentSlice.actions;
export default documentSlice.reducer;

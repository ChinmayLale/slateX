"use client"; // THIS IS REQUIRED
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document } from "@/types/index";

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
   },
});

export const { setDocuments, setLoading, setError, addDocument } = documentSlice.actions;
export default documentSlice.reducer;

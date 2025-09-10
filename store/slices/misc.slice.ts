import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface miscSlice {
   isSearchOpen: boolean
   isSettingsOpen: boolean
   isDocumentDeleted: Record<string, boolean>
   isUploadOpen: boolean
   coverReplacedUrl?: string | undefined

   toggleCreateDocument: boolean
}

const initialState: miscSlice = {
   isSearchOpen: false,
   isSettingsOpen: false,
   isDocumentDeleted: {},
   isUploadOpen: false,
   coverReplacedUrl: undefined,

   toggleCreateDocument: false
};

const miscSlice = createSlice({
   name: "misc",
   initialState,
   reducers: {
      toggleSearch: (state, action: PayloadAction<boolean>) => {
         state.isSearchOpen = action.payload;
      },
      toggleSettings: (state, action: PayloadAction<boolean>) => {
         state.isSettingsOpen = action.payload;
      },
      // ✅ Updated to handle individual document IDs
      toggleDocumentDeleted: (state, action: PayloadAction<{ documentId: string; isDeleted: boolean }>) => {
         const { documentId, isDeleted } = action.payload;
         state.isDocumentDeleted[documentId] = isDeleted;
      },
      // ✅ Alternative: Replace entire record (keep this if you need it)
      setDocumentDeletedRecord: (state, action: PayloadAction<Record<string, boolean>>) => {
         state.isDocumentDeleted = action.payload;
      },

      toggleUpload: (state, action: PayloadAction<boolean>) => {
         state.isUploadOpen = action.payload;
      },

      setCoverReplacedUrlReducder: (state, action: PayloadAction<string | null>) => {
         state.coverReplacedUrl = action.payload ? action.payload : undefined;
         state.isUploadOpen = true
      },

      toggleCreateDocument: (state, action: PayloadAction<boolean>) => {
         state.toggleCreateDocument = action.payload;
      }
   }
})

export const {
   toggleSearch,
   toggleSettings,
   toggleDocumentDeleted,
   setDocumentDeletedRecord,
   toggleUpload,
   setCoverReplacedUrlReducder,
   toggleCreateDocument
} = miscSlice.actions;
export default miscSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface miscSlice {
   isSearchOpen: boolean
   isSettingsOpen: boolean
   isDocumentDeleted: Record<string, boolean>
}

const initialState: miscSlice = {
   isSearchOpen: false,
   isSettingsOpen: false,
   isDocumentDeleted: {}
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
      }
   }
})

export const {
   toggleSearch,
   toggleSettings,
   toggleDocumentDeleted,
   setDocumentDeletedRecord
} = miscSlice.actions;
export default miscSlice.reducer
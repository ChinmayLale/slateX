import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface miscSlice {
   isSearchOpen: boolean
   isSettingsOpen: boolean

}

const initialState: miscSlice = {
   isSearchOpen: false,
   isSettingsOpen: false
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
      }
   }
})

export const { toggleSearch, toggleSettings } = miscSlice.actions;
export default miscSlice.reducer

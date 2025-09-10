"use client";

import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "./slices/documentSlice";
import miscReducer from './slices/misc.slice'

export const store = configureStore({
   reducer: {
      documents: documentReducer,
      misc: miscReducer
   },
});

// Types for RootState & AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

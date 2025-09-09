import { RootState } from "@/store";

export const getPageByIds = (state: RootState, documentId: string, pageId: string) => {
   const doc = state.documents.documents.find(d => d.id === documentId);
   return doc?.pages.find(p => p.id === pageId) || null;
};

export const getPageTitleByIds = (state: RootState, documentId: string, pageId: string) => {
   const doc = state.documents.documents.find(d => d.id === documentId);
   return doc?.pages.find(p => p.id === pageId)?.title || "Untitled Page this is got ";
};

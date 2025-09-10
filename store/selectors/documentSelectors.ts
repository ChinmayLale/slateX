import { RootState } from "@/store";

// In your documentSelectors.ts
export const getPageByIds = (state: RootState, documentId: string, pageId: string) => {
   // First check in regular documents
   let document = state.documents.documents.find(doc => doc.id === documentId);

   // If not found, check in trash documents
   if (!document) {
      document = state.documents.trashDocuments.find(doc => doc.id === documentId);
   }

   return document?.pages?.find(page => page.id === pageId);
};

export const getPageTitleByIds = (state: RootState, documentId: string, pageId: string) => {
   const doc = state.documents.documents.find(d => d.id === documentId);
   return doc?.pages.find(p => p.id === pageId)?.title || "Untitled Page this is got ";
};

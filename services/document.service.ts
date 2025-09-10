"use client";
import api from "@/lib/axios";
import { Document, Page } from "@/types";
import { AxiosError } from "axios";
import {useAuth} from "@clerk/nextjs";

export const createNewDocument = async (title: string = "New Document" , userId:string): Promise<Document | null> => {
   try {
      // const { userId } = useAuth();
      const res = await api.post("/documents/create", { title , userId });
      const { data } = res.data;
      // console.log({ DOC: data });
      return data;
   } catch (err: unknown) {
      if (err instanceof AxiosError) {
         console.error("Axios error:", err.message);
      } else {
         console.error("Unexpected error:", err);
      }
      throw err;
   }
};


export const getAllDocuments = async (userId:string): Promise<Document[]> => {
   try {
      const res = await api.get(`/documents${userId ? `?userId=${userId}` : ""}`);
      const { data } = res.data;
      // console.log({ DOC: data });
      return data;
   } catch (err: unknown) {
      if (err instanceof AxiosError) {
         console.error("Axios error:", err.message);
      } else {
         console.error("Unexpected error:", err);
      }
      throw err;
   }
}


export const addPageToCurrentDocument = async (documentId: string ): Promise<Page | null> => {
   try {
      const res = await api.post("/documents/add-page", { documentId  });
      const { data } = res.data;
      // console.log({ DOC: data });
      return data;
   } catch (err: unknown) {
      if (err instanceof AxiosError) {
         console.error("Axios error:", err.message);
      } else {
         console.error("Unexpected error:", err);
      }
      throw err;
   }
}



export const archiveDocumentById = async (documentId: string): Promise<boolean> => {
   try {
      const res = await api.delete(`/documents?documentId=${documentId}`);
      const { data } = res.data;
      // console.log({ DOC: data });
      return data;
   } catch (err: unknown) {
      if (err instanceof AxiosError) {
         console.error("Axios error:", err.message);
      } else {
         console.error("Unexpected error:", err);
      }
      return false;
   }
}


export const getAllTrashDocuments = async (userId:string): Promise<Document[]> => {
   try {

      const res = await api.get(`/documents/trash${userId ? `?userId=${userId}` : ""}`);
      const { data } = res.data;
      return data;
   } catch (err: unknown) {
      if (err instanceof AxiosError) {
         console.error("Axios error:", err.message);
      } else {
         console.error("Unexpected error:", err);
      }
      return [];
   }
}


export const undoTrashDocumentById = async (documentId: string): Promise<boolean> => {
   try {
      const res = await api.put(`/documents?documentId=${documentId}`);
      const { data } = res.data;
      return data;
   } catch (err: unknown) {
      if (err instanceof AxiosError) {
         console.error("Axios error:", err.message);
      } else {
         console.error("Unexpected error:", err);
      }
      return false;
   }
}


export const deletePermenently = async (id: string): Promise<boolean> => {
   try {
      const res = await api.delete(`/documents/permanent?documentId=${id}`);
      const { data } = res.data;
      return data;
   } catch (err: unknown) {
      if (err instanceof AxiosError) {
         console.error("Axios error:", err.message);
      } else {
         console.error("Unexpected error:", err);
      }
      return false;
   }
}



export const updateTitleForPageService = async (documentId: string, pageId: string, title: string): Promise<string | null> => {
   try {
      const res = await api.post(`/documents/page/update-title`, { documentId, pageId, title });
      const { data } = res.data;
      return data;
   } catch (err: unknown) {
      if (err instanceof AxiosError) {
         console.error("Axios error:", err.message);
      } else {
         console.error("Unexpected error:", err);
      }
      return "";
   }
}



export const updateCoverImageForPageService = async (
   documentId: string,
   pageId: string,
   coverImage: string = "" // default to empty string
): Promise<string | null> => {
   try {
      const res = await api.post(`/documents/page/update-cover-image`, {
         documentId,
         pageId,
         coverImage, // will be "" if not passed
      });
      const { data } = res.data;
      return data;
   } catch (err: unknown) {
      if (err instanceof AxiosError) {
         console.error("Axios error:", err.message);
      } else {
         console.error("Unexpected error:", err);
      }
      return "";
   }
};



export const publishAPageService = async (id: string): Promise<boolean> => {
   try {
      const res = await api.post(`/documents/page/publish`, { pageId: id });
      const { data } = res.data;
      return !!data;
   } catch (err: unknown) {
      if (err instanceof AxiosError) {
         console.error("Axios error:", err.message);
      } else {
         console.error("Unexpected error:", err);
      }
      return false;
   }
}
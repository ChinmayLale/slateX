"use client";
import api from "@/lib/axios";
import { Document, Page } from "@/types";
import { AxiosError } from "axios";

export const createNewDocument = async (): Promise<Document | null> => {
   try {
      const res = await api.post("/documents/create");
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


export const getAllDocuments = async (): Promise<Document[]> => {
   try {
      const res = await api.get("/documents");
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


export const addPageToCurrentDocument = async (documentId: string): Promise<Page | null> => {
   try {
      const res = await api.post("/documents/add-page", { documentId });
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
import { useRef, useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useDebounceCallback } from "usehooks-ts";
import { updateTitleForPageService } from "@/services/document.service";
import { UpdatePageTitleInDocumentReducer } from "@/store/slices/documentSlice";

interface UseTitleEditorProps {
  initialTitle?: string;
  onSaveSuccess?: (newTitle: string) => void;
  onSaveError?: (error: unknown) => void;
  debounceMs?: number;
}

interface UseTitleEditorReturn<T extends HTMLElement> {
  // Refs
  inputRef: React.RefObject<T | null>;

  // State
  title: string;
  isEditing: boolean;
  saving: boolean;
  lastSavedTitle: string;

  // Handlers
  enableInput: () => void;
  disableInput: () => void;
  onInputChange: (e: React.ChangeEvent<T>) => void;
  onKeyDown: (e: React.KeyboardEvent<T>) => void;

  // Direct setters (if needed)
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTitleEditor = <
  T extends HTMLInputElement | HTMLTextAreaElement
>({
  initialTitle = "Untitled Page",
  onSaveSuccess,
  onSaveError,
  debounceMs = 200,
}: UseTitleEditorProps = {}): UseTitleEditorReturn<T> => {
  const inputRef = useRef<T>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [saving, setSaving] = useState(false);
  const [lastSavedTitle, setLastSavedTitle] = useState(initialTitle);

  const dispatch = useDispatch();
  const params = useParams();
  const { documentId, pageId } = params;

  const saveTitle = useDebounceCallback(async (newTitle: string) => {
    // Don't save if title hasn't actually changed
    if (newTitle === lastSavedTitle) return;

    setSaving(true);

    try {
      const res = await updateTitleForPageService(
        documentId as string,
        pageId as string,
        newTitle
      );

      if (res) {
        setLastSavedTitle(newTitle);
        dispatch(
          UpdatePageTitleInDocumentReducer({
            documentId: documentId as string,
            pageId: pageId as string,
            title: newTitle,
          })
        );
        onSaveSuccess?.(newTitle);
      }
    } catch (error) {
      console.error(error);
      // Revert to last saved title on error
      setTitle(lastSavedTitle);
      onSaveError?.(error);
    } finally {
      setSaving(false);
    }
  }, debounceMs);

  const enableInput = useCallback(() => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      if (inputRef.current && "setSelectionRange" in inputRef.current) {
        inputRef.current.setSelectionRange(0, inputRef.current.value.length);
      }
    }, 0);
  }, []);

  const disableInput = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<T>) => {
      const newValue = e.target.value;
      setTitle(newValue);
      saveTitle(newValue);
    },
    [saveTitle]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<T>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        disableInput();
      }
      if (e.key === "Escape") {
        // Revert changes on escape
        setTitle(lastSavedTitle);
        disableInput();
      }
    },
    [lastSavedTitle, disableInput]
  );

  // Update local state when initialTitle changes (e.g., page navigation)
  useEffect(() => {
    if (!isEditing && initialTitle !== lastSavedTitle) {
      setTitle(initialTitle);
      setLastSavedTitle(initialTitle);
    }
  }, [initialTitle, isEditing, lastSavedTitle]);

  return {
    // Refs
    inputRef,

    // State
    title,
    isEditing,
    saving,
    lastSavedTitle,

    // Handlers
    enableInput,
    disableInput,
    onInputChange,
    onKeyDown,

    // Direct setters
    setTitle,
    setIsEditing,
  };
};

// Convenience hooks for specific element types
export const useTitleEditorForTextarea = (props?: UseTitleEditorProps) =>
  useTitleEditor<HTMLTextAreaElement>(props);

export const useTitleEditorForInput = (props?: UseTitleEditorProps) =>
  useTitleEditor<HTMLInputElement>(props);

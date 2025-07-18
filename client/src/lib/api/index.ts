// Re-export all API modules for centralized access
export * from "./base";
export * from "./auth";
export * from "./meetings";
export * from "./notes";
export * from "./ai";
export * from "./crm";

// Convenience exports for commonly used hooks
export { useAuth } from "./auth";
export { 
  useMeetings, 
  useMeeting, 
  useCreateMeeting, 
  useUpdateMeeting, 
  useDeleteMeeting 
} from "./meetings";
export { 
  useNotes, 
  useCreateNote, 
  useUpdateNote, 
  useDeleteNote 
} from "./notes";
export { 
  useAnalyzeNotes, 
  useGenerateCoaching, 
  useGenerateFollowUp 
} from "./ai";
export { 
  useCrmStatus, 
  useSyncToCrm, 
  useTestCrmConnection 
} from "./crm";
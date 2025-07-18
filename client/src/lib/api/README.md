# API Organization Structure

This directory contains the organized API layer for the Salespring application, providing a clean, structured approach to state management with TanStack Query.

## Architecture Overview

The API layer is organized into logical modules with consistent patterns:

```
lib/api/
├── base.ts          # Core utilities, query keys, and error handling
├── auth.ts          # Authentication-related API calls and hooks
├── meetings.ts      # Meeting management API calls and hooks
├── notes.ts         # Note management API calls and hooks
├── ai.ts            # AI analysis and coaching API calls and hooks
├── crm.ts           # CRM integration API calls and hooks
├── utils.ts         # Utility functions and common hooks
└── index.ts         # Central exports
```

## Key Benefits

### 1. **Centralized Query Keys**
All query keys are defined in `base.ts` using a factory pattern:
```typescript
const queryKeys = {
  meetings: {
    all: ["meetings"] as const,
    lists: () => [...queryKeys.meetings.all, "list"] as const,
    detail: (id: number) => [...queryKeys.meetings.details(), id] as const,
  }
};
```

### 2. **Consistent Cache Management**
Optimistic updates and cache invalidation are handled automatically:
```typescript
// Optimistic update
queryClient.setQueryData<Meeting[]>(
  queryKeys.meetings.lists(),
  (old) => old ? [newMeeting, ...old] : [newMeeting]
);

// Invalidate related queries
invalidateQueries.meetings();
```

### 3. **Type Safety**
All API functions and hooks are fully typed with shared schemas:
```typescript
const useMeetings = (): UseQueryResult<Meeting[], Error> => {
  return useQuery({
    queryKey: queryKeys.meetings.lists(),
    queryFn: meetingsApi.getAll,
  });
};
```

### 4. **Error Handling**
Consistent error handling with auth redirects:
```typescript
const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};
```

## Usage Examples

### Basic Query
```typescript
import { useMeetings } from "@/lib/api";

function MeetingsList() {
  const { data: meetings, isLoading, error } = useMeetings();
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return (
    <div>
      {meetings?.map(meeting => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}
```

### Mutation with Optimistic Updates
```typescript
import { useCreateMeeting } from "@/lib/api";

function CreateMeetingForm() {
  const createMeeting = useCreateMeeting();
  
  const handleSubmit = (data: CreateMeetingInput) => {
    createMeeting.mutate(data, {
      onSuccess: (newMeeting) => {
        console.log("Meeting created:", newMeeting);
        // Cache automatically updated
      },
      onError: (error) => {
        console.error("Failed to create meeting:", error);
        // Error handling built-in
      }
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button 
        type="submit" 
        disabled={createMeeting.isPending}
      >
        {createMeeting.isPending ? "Creating..." : "Create Meeting"}
      </button>
    </form>
  );
}
```

### Related Data Queries
```typescript
import { useMeeting, useNotes } from "@/lib/api";

function MeetingDetailView({ meetingId }: { meetingId: number }) {
  const { data: meeting, isLoading: meetingLoading } = useMeeting(meetingId);
  const { data: notes, isLoading: notesLoading } = useNotes(meetingId);
  
  if (meetingLoading || notesLoading) return <Loading />;
  
  return (
    <div>
      <MeetingHeader meeting={meeting} />
      <NotesSection notes={notes} />
    </div>
  );
}
```

## Migration Guide

### From Direct TanStack Query Usage
**Before:**
```typescript
const { data: meetings } = useQuery({
  queryKey: ["/api/meetings"],
  queryFn: () => fetch("/api/meetings").then(r => r.json()),
});
```

**After:**
```typescript
const { data: meetings } = useMeetings();
```

### From Manual Cache Management
**Before:**
```typescript
const mutation = useMutation({
  mutationFn: createMeeting,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
  },
});
```

**After:**
```typescript
const mutation = useCreateMeeting();
// Cache invalidation handled automatically
```

## Advanced Features

### Selective Cache Invalidation
```typescript
// Invalidate specific meeting
invalidateQueries.meetings();

// Invalidate specific notes
invalidateQueries.notes(meetingId);

// Invalidate AI analysis for specific meeting
invalidateQueries.ai(meetingId);
```

### Stale Time Configuration
```typescript
// Short stale time for real-time data
const { data: notes } = useNotes(meetingId); // 30 seconds

// Longer stale time for stable data
const { data: meetings } = useMeetings(); // 2 minutes
```

### Background Refetching
```typescript
const { data: crmStatus } = useCrmStatus();
// Automatically refetches every minute
```

## Best Practices

1. **Always use the organized hooks** instead of direct TanStack Query
2. **Import from the central index** for consistency
3. **Let the API layer handle cache management** - don't invalidate manually
4. **Use TypeScript types** from shared schemas
5. **Handle loading and error states** appropriately
6. **Use optimistic updates** for better UX

## Testing

The organized API layer makes testing easier:

```typescript
// Mock the API layer
jest.mock("@/lib/api", () => ({
  useMeetings: jest.fn(),
  useCreateMeeting: jest.fn(),
}));

// Test component
const mockUseMeetings = useMeetings as jest.MockedFunction<typeof useMeetings>;
mockUseMeetings.mockReturnValue({
  data: mockMeetings,
  isLoading: false,
  error: null,
});
```

## Performance Considerations

- **Automatic deduplication** of identical queries
- **Smart caching** with appropriate stale times
- **Optimistic updates** for immediate UI feedback
- **Background refetching** for data freshness
- **Selective invalidation** to minimize re-renders

This structure provides a scalable, maintainable approach to API management that grows with your application while maintaining excellent developer experience.
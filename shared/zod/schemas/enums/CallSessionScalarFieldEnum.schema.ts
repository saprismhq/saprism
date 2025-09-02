import { z } from 'zod';

export const CallSessionScalarFieldEnumSchema = z.enum(['id', 'meetingId', 'liveKitRoomName', 'liveKitToken', 'participants', 'status', 'startedAt', 'endedAt', 'transcription', 'sessionMetadata', 'createdAt', 'updatedAt'])
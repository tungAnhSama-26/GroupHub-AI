import { z } from 'zod';

export const UserRoleSchema = z.enum(['GUEST', 'USER', 'VERIFIED_USER', 'MODERATOR', 'ADMIN']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const CommunityPlatformSchema = z.enum(['DISCORD', 'TELEGRAM', 'FACEBOOK', 'SLACK', 'REDDIT', 'OTHER']);
export type CommunityPlatform = z.infer<typeof CommunityPlatformSchema>;

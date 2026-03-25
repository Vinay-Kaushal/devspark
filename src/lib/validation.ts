import { z } from "zod";

export const generateIdeasSchema = z.object({
  skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
  language: z.string().min(1).max(50),
  interests: z
    .array(z.string().min(1).max(50))
    .min(1, "Select at least one interest")
    .max(10, "Maximum 10 interests allowed"),
});

export type GenerateIdeasInput = z.infer<typeof generateIdeasSchema>;

export const saveIdeaSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  stack: z.array(z.string()).min(1).max(10),
  roadmap: z.array(z.string()).min(1).max(10),
  domain: z.string().min(1).max(100),
  timeWeeks: z.string().min(1).max(20),
  companies: z.array(
    z.object({
      name: z.string(),
      emoji: z.string(),
      description: z.string(),
    })
  ),
  isPublic: z.boolean().optional().default(false),
});

export type SaveIdeaInput = z.infer<typeof saveIdeaSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be under 30 characters")
    .regex(
      /^[a-z0-9_-]+$/,
      "Only lowercase letters, numbers, hyphens and underscores"
    )
    .optional(),
  bio: z.string().max(300, "Bio must be under 300 characters").optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const builtProjectSchema = z.object({
  savedIdeaId: z.string().cuid("Invalid idea ID"),
  githubUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  liveUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .optional(),
});

export type BuiltProjectInput = z.infer<typeof builtProjectSchema>;


export const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
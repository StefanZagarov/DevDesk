import { z } from "zod";
const URL_REGEX =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Common Input Fields
const BaseCreateSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

// Specific Content Schema
export const SnippetResourceContentSchema = z.object({
  code: z.string().min(1, "Code is required"),
  language: z.string().min(1, "Language is required"),
});

export const NoteResourceContentSchema = z.object({
  markdown: z.string().min(1, "Content is required"),
});

export const LinkResourceContentSchema = z.object({
  url: z.string().regex(URL_REGEX, { message: "Must be a valid URL" }),
  // Metadata is usually fetched by backend, but user might provide overrides
  metadata: z
    .object({
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      ogImage: z.string().optional(),
    })
    .optional(),
});

export const PdfResourceContentSchema = z.object({
  url: z.string().regex(URL_REGEX, { message: "Must be a valid URL" }),
  fileSize: z.number().int().positive(),
  pageCount: z.number().int().positive(),
});

// The Polymorphic Create Schema
export const CreateResourceSchema = z.discriminatedUnion("type", [
  BaseCreateSchema.extend({
    type: z.literal("snippet"),
    content: SnippetResourceContentSchema,
  }),
  BaseCreateSchema.extend({
    type: z.literal("note"),
    content: NoteResourceContentSchema,
  }),
  BaseCreateSchema.extend({
    type: z.literal("link"),
    content: LinkResourceContentSchema,
  }),
  BaseCreateSchema.extend({
    type: z.literal("pdf"),
    content: PdfResourceContentSchema,
  }),
]);

// User form schema
export const RegisterSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, { message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z.string().min(2).optional(),
});

export const LoginSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, { message: "Invalid email address" }),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;

export type CreateResourceInput = z.infer<typeof CreateResourceSchema>;

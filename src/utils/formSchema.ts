import * as z from "zod";

export const FormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  email: z.string().email(),
  home_address: z.string(),
  date_of_birth: z.string(),
  education: z.string(),
  work_history: z.string(),
  phone_number: z.string(),
  job_title: z.string(),
  imageUrl: z.string(),
  courseName: z.string(),
  institutionName: z.string(),
  issueDate: z.string(),

  x: z
    .string()
    .url()
    .regex(
      /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}$/,
      "Invalid Twitter URL"
    
    ) .optional(),
  linkedin: z
    .string()
    .url()
    .regex(
      /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/,
      "Invalid LinkedIn URL"
    )
    .optional(),
  info: z.string(),
  skills: z.any(),
});

export type FormValues = z.infer<typeof FormSchema>;
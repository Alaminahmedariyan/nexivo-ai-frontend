import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit more (min 10 characters)."),
  budget: z
    .enum(["UNDER_1K", "RANGE_1K_5K", "RANGE_5K_10K", "RANGE_10K_25K", "ABOVE_25K", "NOT_SURE"])
    .optional(),
});

export type CreateLeadFormInput = z.infer<typeof createLeadSchema>;
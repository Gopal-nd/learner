import {z} from 'zod'

export const formSchema = z.object({
  school: z.string().min(1, "School name is required"),
  grade: z.enum(["7", "8", "9", "10", "11", "12"]),
  board: z.enum(["CBSE", "ICSE", "State Board", "IB", "IGCSE"]),
  stream: z.string().optional(),
  city: z.string().min(1, "City is required"),
  country: z.enum(["India", "USA", "UK", "Canada", "Australia"]),
});


import {z} from "zod";

// signup validation 
export const registerSchema  = z.object({
 name: z.string().min(1,"Name is required"),
 email: z.string().email("Invlid email"),
 password: z.string().min(6,"Password must be at least 6 characters")
})

// signin validation 
export const loginSchema = z.object({
 email: z.string().email("Invalid Email"),
 password:z.string().min(6,"Password must be at least 6 characters")
})
 
 // journal validation 
export const journalSchema = z.object({
content:z.string().min(5,"Journal content cannot be empty and must have atleast 5 characters")
})
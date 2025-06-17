import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(6),
});

export const LoginDefaultValues: LoginSchemaType = {
  email: "",
  password: "",
};

export const SignupSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email().trim(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export const SignupDefaultValues: SignupSchemaType = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type SignupSchemaType = z.infer<typeof SignupSchema>;

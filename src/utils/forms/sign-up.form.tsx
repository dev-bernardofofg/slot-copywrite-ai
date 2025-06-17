"use client";

import { BaseInput } from "@/components/(bases)/(inputs)/base-input";
import { BaseButton } from "@/components/(bases)/base-button";
import { BaseForm } from "@/components/(bases)/base-form";
import { Form } from "@/components/ui/form";
import { getErrorMessage } from "@/helpers/errors";
import { authClient } from "@/lib/auth-client";
import {
  SignupDefaultValues,
  SignupSchema,
  SignupSchemaType,
} from "@/utils/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chrome } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const SignUpForm = () => {
  const { push } = useRouter();
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: SignupDefaultValues,
  });

  const handleSubmit = async (data: SignupSchemaType) => {
    await authClient.signUp.email(
      {
        email: data.email,
        name: data.fullName,
        password: data.password,
      },
      {
        onSuccess: () => {
          push("/dashboard");
        },
        onError: (error) => {
          toast.error(getErrorMessage(error.error.code));
        },
      }
    );
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <Form {...form}>
      <BaseForm onSubmit={form.handleSubmit(handleSubmit)}>
        <BaseInput control={form.control} name="fullName" label="Full Name" />
        <BaseInput control={form.control} name="email" label="Email" />
        <BaseInput control={form.control} name="password" label="Password" />
        <BaseInput
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
        />
        <BaseButton type="submit">Sign Up</BaseButton>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-800 px-2 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <BaseButton
            variant="outline"
            className="w-full mt-4 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700 hover:text-white"
            type="button"
            onClick={handleGoogleLogin}
          >
            <Chrome className="h-4 w-4 mr-2" />
            Continue with Google
          </BaseButton>
        </div>
      </BaseForm>
    </Form>
  );
};

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FiGithub } from "react-icons/fi";
import { FiSend } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabaseClient } from "@/lib/supabase/client";

const FormSchema = z.object({
  userEmail: z.string().email({
    message: "Fill in the email correctly to access the platform.",
  }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userEmail: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("data", data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };
  const loginWithGitHub = () => {
    supabaseClient.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 h-screen items-center">
      <div className="hidden md:inline-block bg-amber-300 w-full h-full"></div>
      <div className="px-4 md:mx-auto">
        <h2 className="text-4xl text-balance font-bold my-8 md:text-6xl">
          Create an account
        </h2>
        <p className="text-balance my-8 text-slate-400">
          Enter your email below to create your account
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="userEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: jhon@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mb-5 bg-amber-400 text-zinc-900 hover:bg-amber-500 hover:text-white transition-all"
              type="submit"
            >
              Sing in with e-mail
              <span className="ml-3">
                <FiSend size={22} color="text-zinc-900 hover:text-white" />
              </span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              className="flex w-full bg-amber-400 text-zinc-900 hover:bg-amber-500 hover:text-white transition-all"
              onClick={loginWithGitHub}
            >
              Sign in with Github
              <span className="ml-3">
                <FiGithub size={22} color="text-zinc-900 hover:text-white" />
              </span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

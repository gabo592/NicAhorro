"use server";

import { User } from "@/types/user";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const image = formData.get("image") as File;
  const avatarUrl = await uploadFile(image);

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        first_name: formData.get("firstName") as string,
        last_name: formData.get("lastName") as string,
        avatar_url: avatarUrl,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

async function uploadFile(file: File): Promise<string> {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from("avatars")
    .upload(`public/${file.name}`, file);

  if (error) {
    console.error(error);
    return "";
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(`public/${file.name}`);

  return data.publicUrl;
}

export async function getUser(): Promise<User | null> {
  const supabase = await createClient();

  const { error, data } = await supabase.from("users").select().single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/auth/login");
}

'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const image = formData.get('image') as File;
  const avatarUrl = await uploadFile(image);

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
        avatar_url: avatarUrl,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error(error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

async function uploadFile(file: File) {
  const supabase = createClient();

  const { error } = await supabase.storage
    .from('avatars')
    .upload(`public/${file.name}`, file);

  if (error) {
    console.error(error);
    return '';
  }

  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(`public/${file.name}`);

  return data.publicUrl;
}

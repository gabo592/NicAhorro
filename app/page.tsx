import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ToolBar from '@/components/common/toolbar';

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect('/error');
  }

  return (
    <>
      <ToolBar user={data.user} />
      <main></main>
    </>
  );
}

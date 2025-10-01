import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Home } from './home'; // must be a client component

export default async function ExpenseDashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user || !data?.user.email) {
    redirect('/auth/login');
  }


  console.log(data)

  const user = data.user;

   if ( !user.email) {
    redirect('/auth/login');
  }

  return (
    <Home
      userId={user.id}
      username={user.user_metadata.username}
      email={user.email}
    />
  );
}

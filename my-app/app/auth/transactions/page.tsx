import {TransactionsComponent} from './home';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';



export default async function Page() {
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
    // <div className="font-mono">
    //   <Toaster position='top-center'/>
      <TransactionsComponent
      userId={user.id}
      username={user.user_metadata.username}
      email={user.email} />
    // </div>
  );
}





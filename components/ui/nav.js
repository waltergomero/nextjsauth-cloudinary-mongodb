import Navbar from './navbar';
import { getServerSession } from 'next-auth/next';

export default async function Nav() {
  const session = await getServerSession();
  console.log("user info:", session)
  return <Navbar user={session?.user} />;
}
import ConnectFour from '../components/games/ConnectFour'
import type { PageWithLayout } from '../types/NextExtensions';
import {AppLayout} from '../layouts/AppLayout'
import PlayerCard from '../components/ui/PlayerCard'
import {Timeline} from '../components/ui/Timeline'
import { useSession } from "next-auth/react";
const Home: PageWithLayout = () => {
  const { data: sessionData } = useSession();
  const image = sessionData?.user?.image
  const username = sessionData?.user?.name
  return (
    <>
        
      <main className="flex min-h-screen flex-row items-center justify-around bg-gradient-to-b from-[#2e026d] to-[#15162c] ">
   
      {image && username && <PlayerCard image={image} username={username}/>}
        <div className='flex flex-col text-center gap-3'>
        <ConnectFour />
        </div>
        
      {image && username && <PlayerCard image={image} username={username}/>}
      </main>
    </>
  );
};


Home.getLayout = (page) => <AppLayout>{page}</AppLayout>
export default Home;


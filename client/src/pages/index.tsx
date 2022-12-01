import ConnectFour from '../components/games/ConnectFour'
import type { PageWithLayout } from '../types/NextExtensions';
import {AppLayout} from '../layouts/AppLayout'
import PlayerCard from '../components/ui/PlayerCard'
import {Timeline} from '../components/ui/Timeline'

const Home: PageWithLayout = () => {
  
  return (
    <>
        
      <main className="flex min-h-screen flex-row items-center justify-around bg-gradient-to-b from-[#2e026d] to-[#15162c] ">
   
        <PlayerCard />
        <div className='flex flex-col text-center gap-3'>
        <ConnectFour />
        </div>
        
        <PlayerCard />
      </main>
    </>
  );
};


Home.getLayout = (page) => <AppLayout>{page}</AppLayout>
export default Home;


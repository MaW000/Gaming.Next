import ConnectFour from '../components/games/ConnectFour'
import type { PageWithLayout } from '../types/NextExtensions';
import {AppLayout} from '../layouts/AppLayout'
import PlayerCard from '../components/ui/PlayerCard'
import {Timeline} from '../components/ui/Timeline'
import { useSession } from "next-auth/react";
import { io } from 'socket.io-client';
import { useEffect } from 'react';
const Home: PageWithLayout = () => {
  const { data: sessionData } = useSession();
  const image = sessionData?.user?.image
  const username = sessionData?.user?.name
  const socket = io('http://localhost:3001');
  const joinLobbyClick = () => {
    const userData = {username: username, image: image}
    socket.emit('join-lobby', (userData))
  }

  useEffect(() => {
    socket.once('receive-user', ({username, image}) => {{
      console.log(username,image)
    }})
  }, [])
  return (
    <>
      <main className="text-center">
        <button className='p-3 mb-5 bg-blue-900 rounded-lg' onClick={joinLobbyClick}>Join Lobby</button>
        <div className='flex justify-around items-center gap-10 mb-'>
          {image && username && <PlayerCard image={image} username={username}/>}
            <div className='flex flex-col text-center gap-3'>
              <ConnectFour />
            </div>
            
          {image && username && <PlayerCard image={image} username={username}/>}
        </div>
      </main>
    </>
  );
};


Home.getLayout = (page) => <AppLayout>{page}</AppLayout>
export default Home;


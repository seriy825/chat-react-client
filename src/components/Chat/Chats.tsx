import { Menu } from "react-bulma-components"
import './Chats.scss'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import jwtDecode from 'jwt-decode';
import { ChatList } from "./Menu/ChatList";
import { UserList } from "./Menu/UserList";
import { Profile } from "./Menu/Profile";
import { CurrentChat } from "./CurrentChat";
import { ChatHeader } from "./Header/ChatHeader";

export const Chats = ({token,setToken}:any) =>{
  
  const [socket,setSocket] = useState(io());
  const [chats,setChats] = useState([]); 
  const [user,setUser] = useState(jwtDecode(token));
  const [users,setUsers] = useState([]);
  const [currentChat,setChat] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL||'',{  
      transports: ['websocket'],      
      auth: {
        authorization: token,
      },
    });     

    newSocket.on('setChats',(chats,users,message=false)=>{
      setUsers(users)
      setChats(chats);
      if (!document.hasFocus() && message===true)
        new Notification('You have an unread messages!');
    });

    setSocket(newSocket);

    return ()=>{
      newSocket.close();
    }
  }, [setSocket, token]);

  useEffect(()=>{
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    }    
  })

  return (
    <div className="chats">
      <Menu className={currentChat?'':'active'}>
        <Profile user={user} setUser={setUser} setToken={setToken}/>
        <Menu.List>     
          <ChatList chats={chats} setChat={setChat} currentChat={currentChat}/>     
          <UserList users={users} setChat={setChat} currentChat={currentChat}/>                                     
        </Menu.List>   
      </Menu>
      {
        currentChat && 
        <div className={currentChat?'chats-container active':'chats-container'}>
          <ChatHeader recepient={currentChat} setChat={setChat}/>
          <CurrentChat recepient={currentChat} user={user} socket={socket}/>
        </div>
      }
    </div>
  )
}
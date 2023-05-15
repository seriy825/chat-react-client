import { Menu } from "react-bulma-components"

export const ChatList = ({chats,currentChat,setChat}:any) =>{
  return (
    <>
    {
      chats.map((chat:any)=>(          
        <Menu.List.Item key={chat._id} active={currentChat===chat.recepient} className="chat-item" onClick={()=>setChat(chat.recepient)}>            
          {
            chat?.recepient?.avatar 
            ?      
              <img src={process.env.REACT_APP_API_URL+'/'+chat?.recepient?.avatar} alt='avatar' className="avatar chat-item" />                        
              :   
              <span className="avatar chat-item" style={{ backgroundColor:'#'+Math.floor(Math.random()*16777215).toString(16) }}>
                {chat?.recepient?.name.match(/(?<!\p{L}\p{M}*)\p{L}/gu).join('').toUpperCase()}
              </span>
          }                  
          <div className="chat-item-content">
            <div className="chat-item-content_name">
              <span>{chat?.recepient?.name}</span>        
              {
                chat.last_message&&((new Date().getTime() - new Date(chat.last_message.createdAt).getTime())/(1000 * 3600 * 24)>1) 
                ? 
                  ((new Date().getTime() - new Date(chat.last_message.createdAt).getTime())/(1000 * 3600 * 24)>7) 
                  ?
                  <span>{new Date(chat.last_message.createdAt).toLocaleDateString('en-US')}</span>
                  :                      
                  <span>{new Date(chat.last_message.createdAt).toLocaleDateString('en-US',{weekday:'short'})}</span>
                :
                chat.last_message&&<span>{new Date(chat.last_message.createdAt).getHours()}:{new Date(chat.last_message.createdAt).getMinutes()}</span>
              }                            
            </div>
            {chat.last_message&&<span className="chat-item-content_message">{chat.last_message.content}</span>}
          </div>
        </Menu.List.Item>                  
      ))
    }   
    </> 
  )
}
import { Menu } from "react-bulma-components"

export const UserList = ({users,currentChat,setChat}:any) => {
  return (
    <>
      {
        users.map((user:any)=>(
          <Menu.List.Item key={user._id} active={currentChat===user} className="chat-item" onClick={()=>setChat(user)}>            
          {
            user.avatar 
            ? 
            <img src={process.env.REACT_APP_API_URL+'/'+user.avatar} alt='avatar' className="avatar chat-item" />                                     
              :   
              <span className="avatar chat-item" style={{ backgroundColor:'#'+Math.floor(Math.random()*16777215).toString(16) }}>
                {user.name.match(/(?<!\p{L}\p{M}*)\p{L}/gu).join('').toUpperCase()}
              </span>
          }   
          <div className="chat-item-content">
            <div className="chat-item-content_name">
              <span>{user.name}</span>  
            </div>
          </div>
          </Menu.List.Item>
        ))
      }
    </>
  )
}
import { Block, Icon, Level } from "react-bulma-components"
import { Mute } from "../Mute"
import { BsArrowLeft } from "react-icons/bs"

export const ChatHeader = ({recepient,setChat}:any) => {
  return (
    <Block className="chats-header">
        <Level>
          <Level.Side>
            <Icon className="back-arrow" onClick={(e:any)=>setChat(null)}>
              <BsArrowLeft color={'white'} />
            </Icon> 
            {
              recepient.avatar 
              ?    
              <img src={process.env.REACT_APP_API_URL+'/'+recepient.avatar} alt='avatar' className="avatar" />                                          
              :   
                <span className="avatar" style={{ backgroundColor:'#'+Math.floor(Math.random()*16777215).toString(16) }}>
                  {recepient.name.match(/(?<!\p{L}\p{M}*)\p{L}/gu).join('').toUpperCase()}
                </span>        
            }
            <span className="chats-header_name">{recepient?.name}</span>
          </Level.Side>
          <Level.Side align='right'>  
            <Mute /> 
          </Level.Side>
        </Level>
      </Block>  
  )
}
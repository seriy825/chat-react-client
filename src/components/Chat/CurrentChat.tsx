import { useCallback, useEffect, useRef, useState } from "react";
import { Block, Button, Form, Icon, Section } from "react-bulma-components"
import { BsFillSendFill } from "react-icons/bs"

export const CurrentChat = ({recepient,user,socket}:any) =>{    
  const [message,setMessage] = useState('');
  const [messages,setMessages] = useState([]); 

  const container = useRef<HTMLDivElement>(null)

  const Scroll = () => {
    container.current?.scrollIntoView({behavior:'smooth'});
  }  
  
  useEffect(()=>{
    socket.emit('getMessages',{recepient});

    socket.on('setMessages',(messages:any)=>{
      setMessages(messages);
    });  
    
  },[recepient, socket])  

  socket.on('getMessage',(message:never)=>{
    setMessages([...messages, message]);
  });

  useEffect(()=>{
    Scroll();
  },[messages]);

  const handleSubmit = useCallback((e:any)=>{
    e.preventDefault();    
    socket.emit('message',{content:message,recepient})
    setMessage('');
  },[message, recepient, socket]);
  return (
    <>
      <Section className="chats-content">
        {
          messages.map((message:any)=>(    
            <div key={message._id}>
                {
                  user._id===message.sender_id._id
                  ?
                    <div className="message sender">                      
                      <div className="content">
                        <span className="content_text">{message.content}</span>
                        <span className="content_time">
                          {new Date(message.createdAt).getHours()}
                          :
                          {(new Date(message.createdAt).getMinutes()<10)
                            ?
                            '0'+new Date(message.createdAt).getMinutes()
                            :
                            ''+new Date(message.createdAt).getMinutes()
                          }
                        </span>
                      </div>     
                    </div>     
                  :
                    <div className="message recepient">
                      <div className="content">
                        <span className="content_text">{message.content}</span>
                        <span className="content_time">
                          {new Date(message.createdAt).getHours()}
                          :
                          {(new Date(message.createdAt).getMinutes()<10)
                            ?
                            '0'+new Date(message.createdAt).getMinutes()
                            :
                            ''+new Date(message.createdAt).getMinutes()
                          }
                        </span>
                      </div>                        
                    </div>
                }                                                              
              </div>                             
          ))
        }
        <div ref={container}></div>        
    </Section>
    <Block className="chats-input">
      <Form.Field>
        <Form.Control>
          <Form.Textarea 
            fixedSize 
            rows={1} 
            wrap='soft' 
            value={message}
            onChange={(e)=>setMessage(e.target.value)} 
            placeholder="Message"
            onKeyPress={e => {
              if(e.key === 'Enter')
                  handleSubmit(e);
              }
            }
          />                         
          <Button disabled={message?false:true} onClick={handleSubmit}>
            <Icon>
              <BsFillSendFill/>
            </Icon> 
          </Button>
        </Form.Control>
      </Form.Field>
    </Block>
    </>  
  )
}
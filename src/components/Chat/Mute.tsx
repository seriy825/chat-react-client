import { useState } from "react";
import { BsBellFill, BsBellSlashFill} from "react-icons/bs"

export const Mute = () => {
  const [mute,setMute] = useState(false);
  return (
    <>
      {
        mute?<BsBellFill color='white' title='Mute notifications' onClick={e=>setMute((mute: any)=>!mute)}/>
        :<BsBellSlashFill color='white' title='Unute notifications' onClick={e=>setMute((mute: any)=>!mute)} />
      }  
    </>
  )  
}
import { useCallback, useState } from "react"
import { Button, Card, Form } from "react-bulma-components"
import { BsFillPersonFill, BsUpload } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { InputWithRef } from "../../InputWithRef";
import { UserService } from "./../../../services/user.service";
import jwtDecode from "jwt-decode";

export const Profile = ({user,setUser,setToken}:any) => {

  const [modal,setModal] = useState(false);
  const {register,handleSubmit,formState:{errors},watch} = useForm({
    mode:'onChange',
  });
  const file = watch('avatar',[]);
  const name = watch('name','');
  const logout = ()=>{
    localStorage.removeItem('user');
    setToken(null);
  }

  const update = useCallback(async (data:any)=>{
    let form = new FormData();
    if (data.name.length>0)
      form.append('name',data.name);
    if (data.avatar.length>0)
      form.append('avatar',data.avatar[0]);
    form.append('_id',user._id.toString());
    const newToken = (await UserService.update(form))?.data?.access_token;
    localStorage.setItem('user',newToken);
    setToken(newToken);
    setUser(jwtDecode(newToken));
  },[setToken, setUser, user._id]) 
  return (
    <>
      <div className="centered">
        {user.avatar ?         
          <img src={process.env.REACT_APP_API_URL+'/'+user.avatar} alt='avatar' className="avatar" onClick={e=>setModal(true)} title="Click for update user information"/>              
          :   
          <span className="avatar centered" style={{ backgroundColor:'#'+Math.floor(Math.random()*16777215).toString(16) }}  title="Click for update user information" onClick={e=>setModal(true)}>
            {user.name.match(/(?<!\p{L}\p{M}*)\p{L}/gu).join('').toUpperCase()}
          </span>        
        }          
      </div>
      <div className={modal?'modal is-active':'modal'}>
        <div className="modal-background" onClick={e=>setModal(false)}></div>
        <div className="modal-content">
          <Card>
            <Card.Header>
              <Card.Header.Title justifyContent='space-between'>
                <Card.Header.Icon>
                  <BsFillPersonFill/>
                </Card.Header.Icon>
                Update user profile
                <Button color='danger' onClick={logout}>Log out</Button>
              </Card.Header.Title>
            </Card.Header>
            <Card.Content>
              <form onSubmit={handleSubmit(update)}>
                <Form.Field>
                  <Form.Label>Name</Form.Label>
                  <Form.Control>
                    <InputWithRef
                      type='text'
                      {
                        ...register('name',{
                          minLength:{
                            value:4,
                            message:'Name must be at least 4 characters long.'
                          }                          
                        })
                      }
                      placeholder='Enter your name...'
                      color={errors?.name?.message?'danger':''}
                    />                
                  </Form.Control>
                  {
                    errors?.name?.message &&
                    <Form.Help color='danger' className='login__help'>
                      {errors?.name?.message.toString()}
                    </Form.Help>
                  }
                </Form.Field>
                <Form.Field>
                  <Form.Label>Avatar</Form.Label>
                    <div className={file.length>0?"file is-info has-name":"file is-info"}>
                      <label className="file-label">
                        <input className="file-input" type="file" accept="image/*"
                        {
                          ...register('avatar')
                        }
                        />
                        <span className="file-cta">
                          <span className="file-icon">
                            <BsUpload/>
                          </span>
                          <span className="file-label">
                            Select a file...
                          </span>
                        </span>
                        {
                          file.length>0 && <span className="file-name">
                            {file.length>0?file[0]?.name:''}
                          </span>
                        }
                      </label>
                    </div>
                </Form.Field>
                <Form.Control textAlign='center'>
                  <Button color='info' type='submit' disabled={name.length===0&&file.length===0}>
                    Update user info
                  </Button>
                </Form.Control>
              </form>
            </Card.Content>           
          </Card>
        </div>
        <button className="modal-close is-large" onClick={e=>setModal(false)} aria-label="close"></button>
      </div>
    </>
  )
}
import React, { useCallback, useState } from 'react';
import './RegisterPage.scss';
import { Button, Form, Block, Notification, Section,Container} from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { InputWithRef } from '../InputWithRef';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/Auth';
import { Props } from '../../types/Auth.type';

export const RegisterPage = ({setRegistered,setToken}:Props) =>{

  const {register,handleSubmit,formState:{errors},watch} = useForm({
    mode:'onChange',
  });  
  const {signUp} = useAuth(setToken);
  const [messages,setMessages]=useState([]);
  const [loading,setLoading] = useState(false);
  const [failed,setFailed] = useState(false);
  
  const handleLoginClick = () => {
    setRegistered(true);
  }

  const registerUser = useCallback(async (data:any)=>{
    const result = await signUp(data);
    if (result?.status===200){
      setLoading(true);
    }
    else{
      setFailed(true);
      setMessages(result?.data?.message);      
    };    
  },[signUp]) 
  

  return (
    <Section className='register'>
      <Container>
        <h2 className='register__title'>Register an acoount to get an access to chat</h2>
        <form onSubmit={handleSubmit(registerUser)}>
          {
            failed &&
            <Block>
              <Notification 
                color='danger'
                className='register__fail'
              >
                {
                  Array.isArray(messages)
                  ?
                  messages.map(m=>(
                    <p>{m}</p>
                  ))
                  :
                  (<p>{messages}</p>)
                }
              </Notification>                       
            </Block>
          } 
         <Form.Field>
            <Form.Label>Full name<span className='required'></span></Form.Label>
            <Form.Control>
              <InputWithRef 
                placeholder='Enter your name...' 
                type='text' 
                {...register('name',{
                  required:'Name is required.',
                  minLength:{
                    value:4,
                    message:'Name must be at least 4 characters long.'
                  }
                })}                  
                color={errors?.name?.message?'danger':''}
              >                
              </InputWithRef>
            </Form.Control> 
            {
              errors?.name?.message && 
              <Form.Help 
                color='danger'
                className='register__help'
              >
                {errors?.name?.message.toString()}
              </Form.Help>         
            }            
          </Form.Field>
          <Form.Field>
            <Form.Label>E-mail<span className='required'></span></Form.Label>
            <Form.Control>
              <InputWithRef 
                placeholder='Enter your e-mail...' 
                type='email' 
                {...register('email',{
                  required:'E-mail is required.',
                  pattern:{
                    value:/\S+@\S+\.\S+/,
                    message:'Enter correct e-mail.'
                  }
                })}                  
                color={errors?.email?.message ?'danger':''}                
              >                
              </InputWithRef>
            </Form.Control>  
            {
              errors?.email?.message &&
              <Form.Help 
                color='danger'
                className='register__help'
              >
                {errors?.email?.message.toString()}
              </Form.Help>         
            }             
          </Form.Field>
          <Form.Field>
            <Form.Label>Password<span className='required'></span></Form.Label>
            <Form.Control>
              <InputWithRef 
                placeholder='Enter password...' 
                type='password' 
                {...register('password',{
                  minLength:{
                    value:8,
                    message:'Password must be at least 8 characters long.'
                  },
                  required:'Enter a password.'
                })}                
                color={errors?.password?.message ?'danger':''}
              >                
              </InputWithRef>
            </Form.Control> 
            {
              errors?.password?.message && 
              <Form.Help 
                color='danger'
                className='register__help'
              >
                {errors?.password?.message.toString()}
              </Form.Help>         
            }            
          </Form.Field>
          <Form.Field>
            <Form.Label>Confirm password<span className='required'></span></Form.Label>
            <Form.Control>
              <InputWithRef 
                placeholder='Confirm password...' 
                type='password' 
                {...register('password_confirmation',{
                  required:'Confirm a password.',
                  validate:(value:string)=>{
                    if (watch('password')!==value) 
                      return 'Password does not match.';
                  }
                })}                
                color={errors?.password_confirmation?.message ?'danger':''}
              >                
              </InputWithRef>
            </Form.Control> 
            {
              errors?.password_confirmation?.message && 
              <Form.Help 
                color='danger'
                className='register__help'
              >
                {errors?.password_confirmation?.message.toString()}
              </Form.Help>         
            }            
          </Form.Field>          
          <Form.Field>
            <Form.Control textAlign='center'>
              <Button 
                color="link"
                className='register__button'
              >
                Sign up
                {loading ? <span className='loader'></span>:null}
              </Button>
            </Form.Control>
          </Form.Field>          
        </form>        
        <div className='register'>
          <p>Already have an account?&nbsp;
            <Link className='register__link' to='/' onClick={handleLoginClick}> 
              Login now!
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
};

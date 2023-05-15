import React, { useCallback, useState } from 'react';
import './LoginPage.scss';
import { Button, Form, Block, Notification,Section, Container } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { InputWithRef } from '../InputWithRef';
import { useAuth } from '../../hooks/Auth';
import { Props } from '../../types/Auth.type';

export const LoginPage = ({setRegistered,setToken}:Props) =>{

  const {register,handleSubmit,formState:{errors}} = useForm({
    mode:'onChange',
  });

  const {signIn} = useAuth(setToken);

  const [failed,setFailed] = useState(false);
  const [loading,setLoading] = useState(false);

  const logIn = useCallback(async (data:any)=>{
    const result = await signIn(data);
    if (result?.status===200){
      setLoading(true);
    }
    else{
      setFailed(true);
    };    
  },[signIn]) 
  
  const handleRegisterClick = () => {
    setRegistered(false);
  }

  return (
    <Section className='login'>
      <Container>
        <h2 className='login__title'>Login first to get an access to chat</h2>
        <form onSubmit={handleSubmit(logIn)}>
          {
            failed &&
            <Block>
              <Notification 
                color='danger'
                className='login__fail'
              >
                Login or password is not correct.
              </Notification>                       
            </Block>
          } 
          <Form.Field>
            <Form.Label>E-mail</Form.Label>
            <Form.Control>
              <InputWithRef 
                type='email'                  
                {...register('email',{
                  required:'E-mail is required.',
                  pattern:{
                    value:/\S+@\S+\.\S+/,
                    message:'Enter correct e-mail.'
                  }
                })}        
                placeholder='Enter your e-mail...'              
                color={errors?.email?.message ?'danger':''}                
              >                
              </InputWithRef>
            </Form.Control>  
            {
              errors?.email?.message &&
              <Form.Help 
                color='danger'
                className='login__help'
              >
                {errors?.email?.message.toString()}
              </Form.Help>                       
            }             
          </Form.Field>
          <Form.Field>
            <Form.Label>Password</Form.Label>
            <Form.Control>
              <InputWithRef 
                {...register('password',{
                  minLength:{
                    value:8,
                    message:'Password must be at least 8 characters long.'
                  },
                  required:'Enter a password.'
                })}
                placeholder='Enter password...' 
                type='password' 
                color={errors?.password?.message ?'danger':''}
              >                
              </InputWithRef>
            </Form.Control> 
            {
              errors?.password?.message && 
              <Form.Help 
                color='danger'
                className='login__help'
              >
                {errors?.password?.message.toString()}
              </Form.Help>         
            }            
          </Form.Field>
          <Form.Control textAlign='center'>
            <Button 
              color="link"
              className='login__button'
              type='submit'
            >              
              Log in            
              {loading ? <span className='loader'></span>:null}
            </Button>
          </Form.Control>     
        </form>        
        <div className='register'>
          <p>Don't have an account? &nbsp;
            <Link className='register__link' to='/' onClick={handleRegisterClick}> 
              Register now!
            </Link>
          </p>
        </div>
      </Container>      
    </Section>
  );
};

import './NotConfirmed.scss';

export const NotConfirmed = () => {
  return (
    <div className='not-confirmed'>
      <span>Please, confirm your email for get an access for our chat app!</span>
      <a href='https://mail.google.com/' target='blank'>You can find letter with a confirmation link here...</a>
    </div>
  )
}
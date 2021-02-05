import axios from 'axios';
import { useState } from 'react';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      'Project-ID': '1514a656-ee38-4378-9f66-d87afa4fe896',
      'User-Name': userName,
      'User-Secret': password,
    };

    try {
      await axios.get('https://api.chatengine.io/chats', {
        headers: authObject,
      });

      localStorage.setItem('userName', userName);
      localStorage.setItem('password', password);
      window.location.reload();
    } catch (error) {
      setError('Opps, Username and Password mismatch!!!!');
    }
  };

  return (
    <div className='wrapper'>
      <div className='form'>
        <h1 className='title'>Satirtho Chat</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className='input'
            placeholder='User Name'
            required
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input'
            placeholder='Password'
            required
          />
          <div align='center'>
            <button type='submit' className='button'>
              <span>Login</span>
            </button>
          </div>
          <h2 className='error'>{error}</h2>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

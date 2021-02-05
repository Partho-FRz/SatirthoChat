import { ChatEngine } from 'react-chat-engine';
import './App.css';
import LoginForm from './components/LoginForm';

const App = () => {
  if (!localStorage.getItem('userName')) return <LoginForm />;
  return (
    <ChatEngine
      height='100vh'
      projectID='1514a656-ee38-4378-9f66-d87afa4fe896'
      userName={localStorage.getItem('userName')}
      userSecret={localStorage.getItem('password')}
    />
  );
};

export default App;

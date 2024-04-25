import Messager from './components/Messager';
import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider';

function App() {

  const clientId = '242939665485-1itm0p8gadgcumvoo5m4vuojs3ttiemd.apps.googleusercontent.com'
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider >
        <Messager />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

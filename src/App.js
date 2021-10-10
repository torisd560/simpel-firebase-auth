import { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import initializeFirebaseAuthentication from './firebase/firebase.init'

initializeFirebaseAuthentication()

function App() {
  const [toggle, setToggle] = useState(false)
  return (
    <div className="w-50 mx-auto">
      {
        toggle ? <Login></Login>
        : <SignUp></SignUp>
        }


      <div className='text-center text-primary custom-cursor-defualt'>
        {toggle ?<p onClick={() => setToggle(false)}>Create an  new account?</p>
          :
           <p onClick={() =>setToggle(true)}>Already have an Account? Please Login</p>
        }
      </div>
  </div>
  );
}

export default App;

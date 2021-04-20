import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import SignPage from './pages/SignPage';
import InfoPage from './pages/InfoPage'; 
import MainPage from './pages/MainPage'; 
import SignUpPage from './pages/SignUpPage';



function App(props) {
  const [accountID, setAccountID] = useState([])
  

  return (
  <div className='App'>
    <Router>
      
       <Switch>
        <Route path = '/main' component={() => <MainPage accountID={accountID}/>} />
        <Route path = '/info' component={() => <InfoPage accountID={accountID}/>} />
        <Route path = '/signup' component={SignUpPage} />
        <Route path = '/'  component={() => <SignPage setAccountID={setAccountID}/>} />
       </Switch>

    </Router>
    
  </div>
  );
} 

export default App;


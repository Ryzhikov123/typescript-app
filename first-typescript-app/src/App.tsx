import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { DashboardPage } from './components/pages/dashboard';
import { SignIn } from './components/pages/signIn';
import { SignUp } from './components/pages/signUp';

const Routes = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      history.push('/signIn');
    } else {
      history.push('/dashboard');
    }
  }, [token]);
  return (
    <Switch>
      <Redirect exact path="/" to="signIn" />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/dashboard" component={DashboardPage} />
    </Switch>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;

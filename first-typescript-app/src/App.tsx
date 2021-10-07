import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { CartPage } from './components/pages/Cart';
import { DashboardPage } from './components/pages/Dashboard/index';
import { OrderPage } from './components/pages/Order';
import { ProductPage } from './components/pages/Product';
import { ProductsPage } from './components/pages/Products';
import { SignIn } from './components/pages/SignIn';
import { SignUp } from './components/pages/SignUp';
import { UserContextProvider } from './context/userContext';

const Routes = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      history.push('/signIn');
    }
  }, [token]);
  return (
    <Switch>
      <Redirect exact path="/" to="signIn" />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/products" component={ProductsPage} />
      <Route exact path="/products/:id" component={ProductPage} />
      <Route exact path="/cart" component={CartPage} />
      <Route exact path="/order" component={OrderPage} />
      <Route component={() => <>404: Page not found</>} />
    </Switch>
  );
};

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Routes />
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;

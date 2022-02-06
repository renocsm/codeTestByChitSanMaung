import { BrowserRouter , Route, Switch } from 'react-router-dom';

// 
import Header from '../components/ui/Header'

// import components list 
import Home from '../Dashboard/Home'
 
// Auth 
import Login from '../Auth/Login'
// import ForgetPassword from '../Auth/ForgetPassword' 

import StripeContainer  from './Checkout/StripeContrainer';
import OrderList from './EVoucher/OrderList'
import EVoucherList from './EVoucher/EVoucherList'
// private Route
import { PrivateRoute } from '../Auth/jwtAuth/PrivateRoute';

export const Routes = () => {  

    return (
        <BrowserRouter>
        <Switch>
          
            <Route path="/login">
                    <Login />
            </Route>
              <Header>
                <PrivateRoute path="/home" exact render={(props) => <Home/>} />  
                <PrivateRoute path="/buyEvoucher" exact render={() => < StripeContainer />}/> 
                <PrivateRoute path="/orderList" exact render={() => < OrderList />}/> 
                <PrivateRoute path="/voucherList" exact render={() => < EVoucherList />}/> 
              </Header >
        </Switch>
      </BrowserRouter>
    );
}
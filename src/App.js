import React,{Fragment,Suspense,lazy} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FindRegistry from './pages/FindRegistry';
import CreateRegistry from './pages/CreateRegistry';
import SignUp from './pages/SignUp';
import About from './pages/About';
import GiftTracker from './components/GiftTracker';
import EventType from './pages/EventType';
// import ManageRegistry from './pages/ManageRegistry';
import CheckoutForm from './pages/CheckoutForm';
import RegistryChecklist from './pages/ChecklistPage';
import getstarted from './components/WeddEvent';
import Login from './pages/Login';
import {ResetPassword} from './components/ResetPassword';
import AddToCart from './components/AddToCart';
import ActivateAcoount from './pages/ActivateAcoount';
import Spinner from 'react-bootstrap/Spinner'

const  Home = lazy(()=> import('./pages/Home'));
const  ManageRegistry = lazy(()=> import('./pages/ManageRegistry'));
// const  Home = lazy(()=> import('./pages/Home'));


function App() {
  return (
    <Fragment>
             <Suspense fallback={<Spinner className='loader' animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>} >
             {/* <Suspense fallback={<div className="spinner center"><h3>Loading...</h3></div>} > */}
            <Router>
                <Switch>
                  <Route  exact path='/Dashboard' component={Dashboard} />
                  <Route exact path='/Find' component={FindRegistry} />
                  <Route exact path='/' component={Home} />
                  <Route path='/createRegistry' component={CreateRegistry} />
                  <Route path='/signUp' component={SignUp} />
                  <Route path='/updateprofile' component={About} />
                  <Route path='/verification/' component={ActivateAcoount} />
                  <Route path='/checklist' component={RegistryChecklist} />
                  <Route path='/manageregistry' component={ManageRegistry} />
                  <Route path='/giftTracker' component={GiftTracker} />
                  <Route path='/myevent' component={EventType} />
                  <Route path='/checkout' component={CheckoutForm} />
                  <Route path='/getstarted' component={getstarted} />
                  <Route path='/sign in' component={Login} />
                  <Route path='/additem' component={AddToCart} />
                  <Route path='/Passwordreset' component={ResetPassword} />
                  {/* <Route component={()=>} /> */}
               
                </Switch>
            </Router>
            </Suspense>
        </Fragment>
  
  );
}

export default App;

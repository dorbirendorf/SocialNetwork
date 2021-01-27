import './App.css';
import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken'
import {loadUser} from './actions/auth'

//Redux
import {Provider} from 'react-redux'
import store from './store'

if(localStorage.getItem('token')){
  setAuthToken(localStorage.getItem('token'))
}


const App=()=> {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return(
  <Provider store={store}>

    <Router>
      <Navbar/>
      <Route exact path="/" component={Landing}/>
      <section className="container">
      <Alert/>
      <Switch>
       <Route exact path="/register" component={Register}/>
       <Route exact path="/login" component={Login}/>


      </Switch>
      
      </section>


    </Router>
  </Provider>
)}

export default App;

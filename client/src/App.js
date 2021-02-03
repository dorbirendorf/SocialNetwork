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
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'



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
       <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
       <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
       <PrivateRoute exact path="/add-Experience" component={AddExperience}/>
       <PrivateRoute exact path="/add-Education" component={AddEducation}/>




       <PrivateRoute exact path="/dashboard" component={Dashboard}/>



      </Switch>
      
      </section>


    </Router>
  </Provider>
)}

export default App;

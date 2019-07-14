import React from 'react';
import Users from './components/Users'
import Navbar from './layout/Navbar'
import AddUser from './forms/AddUser'
import EditUser from './forms/EditUser'
import Page404 from './pages/Page404'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

class App extends React.Component{

  render(){
    return(
      <Router>
        <Navbar title="USER APP"/>
        <div className="container mt-2">
        <Switch>
          <Route exact path = "/" component = { Users} />
          <Route exact path = "/add" component = { AddUser }/>
          <Route exact path = "/edit/:id" component = { EditUser }/>
          <Route component = { Page404 }/>
        </Switch>
        </div>
      </Router>
    )
  }
}


export default App;

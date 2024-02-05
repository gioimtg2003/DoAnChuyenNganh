import './App.scss';
import Nav from '../components/Navigation/Nav';
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'

import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() { 
  return (
    <Router>
      <div className="App">
      <Nav/>
        <Switch>
          <Route path="/new">
            New
          </Route>
          <Route path="/about">
            User
          </Route>
          <Route path="/contact">
            contact
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="*">
            404 Not Found
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

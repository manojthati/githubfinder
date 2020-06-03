import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import About from './components/Pages/About';
import Home from './components/Pages/Home';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import NotFound from './components/Pages/NotFound';

import './App.css';

const App = () => {  
  // async componentDidMount(){
  //   this.setState({loading: true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
    
  //   console.log(process.env.REACT_APP_GITHUB_SECRET);
  //   this.setState({ users:res.data, loading: false});
  // }
    return (
      <GithubState>
        <AlertState>
        <Router>
          <div className="App">
           <Navbar />
            <div className="container">
              < Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:username' component={User} />
                <Route component={NotFound} />
              </Switch>          
            </div>
          </div>
        </Router>
        </AlertState>
      </GithubState>
    );  
}

export default App;

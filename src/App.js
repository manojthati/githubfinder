import React, { Fragment, useState } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import About from './components/Pages/About';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  
  // async componentDidMount(){
  //   this.setState({loading: true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
    
  //   console.log(process.env.REACT_APP_GITHUB_SECRET);
  //   this.setState({ users:res.data, loading: false});
  // }
//Get GitHub User Repo 
  const getUserRepos = async username =>{
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
          
    setRepos(res.data);
    setLoading(false);        
  };  


  //alerting when searching with null
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout( () => setAlert(null), 3000);
  };

    return (
      <GithubState>
        <Router>
          <div className="App">
           <Navbar />
            <div className="container">
              < Alert alert={alert}/>
              <Switch>
                <Route exact path='/' render={props =>(
                  <Fragment>
                    <Search setAlert={showAlert}/>
                    <Users />
                  </Fragment>
               )} 
                />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:username' render={props =>(
                  <User{ ...props} getUserRepos={getUserRepos} repos={repos} />
                )} />
              </Switch>          
            </div>
          </div>
        </Router>
      </GithubState>
    );  
}

export default App;

import React, { Fragment, useState } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import About from './components/Pages/About';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  
  // async componentDidMount(){
  //   this.setState({loading: true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
    
  //   console.log(process.env.REACT_APP_GITHUB_SECRET);
  //   this.setState({ users:res.data, loading: false});
  // }
  const searchUsers = async text =>{
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
        
    setUsers(res.data.items);
    setLoading(false);
  };

  //Get SIngle GitHub User
  const getUser = async username =>{
    setLoading (true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
        
    setUser(res.data);
    setLoading(false);  
  };
//Get GitHub User Repo 
  const getUserRepos = async username =>{
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
          
    setRepos(res.data);
    setLoading(false);        
  };
  
  //clear Users form state 
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  //alerting when searching with null
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout( () => setAlert(null), 3000);
  };

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            < Alert alert={alert}/>
            <Switch>
              <Route exact path='/' render={props =>(
                <Fragment>
                  <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true:false} setAlert={showAlert}/>
                  <Users loading={loading} users={users} />
                </Fragment>
              )} 
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:username' render={props =>(
                <User{ ...props} getUser={getUser} getUserRepos={getUserRepos} user={user} loading={loading} repos={repos} />
              )} />
            </Switch>          
          </div>
        </div>
      </Router>
    );  
}

export default App;

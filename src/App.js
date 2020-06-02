import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import About from './components/Pages/About';
import './App.css';

class App extends Component {
  state = {users: [], user:{}, repos: [], loading: false, alert: null,};

  // async componentDidMount(){
  //   this.setState({loading: true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
    
  //   console.log(process.env.REACT_APP_GITHUB_SECRET);
  //   this.setState({ users:res.data, loading: false});
  // }
  searchUsers = async text =>{
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
        
    this.setState({ users:res.data.items, loading: false});
  }

  //Get SIngle GitHub User
  getUser = async username =>{
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
        
    this.setState({ user: res.data, loading: false});    
  }
//Get GitHub User Repo 
  getUserRepos = async username =>{
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`);
          
    this.setState({ repos: res.data, loading: false});    
    }
  
  //clear Users form state 
  clearUsers = () => this.setState({users: [], loading: false});

  //alerting when searching with null
  setAlert = (msg, type) =>{
    this.setState({alert:{msg, type}})
    setTimeout(() => this.setState({alert:null}), 3000)
  };
 
  render(){
    const {loading, user, users, repos} = this.state;  
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            < Alert alert={this.state.alert}/>
            <Switch>
              <Route exact path='/' render={props =>(
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true:false} setAlert={this.setAlert}/>
                  <Users loading={loading} users={users} />
                </Fragment>
              )} 
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:username' render={props =>(
                <User{ ...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} loading={loading} repos={repos} />
              )} />
            </Switch>          
          </div>
        </div>
        </Router>
    );
  }
  
}

export default App;

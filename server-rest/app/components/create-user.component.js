import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {  //async e 
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('http://localhost:4000/users/add', user)
      .then(res => console.log(res.data));
      
    //Postgresql consumir API REST

    //const body = { this.state.username };
    fetch('http://localhost:4000/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },   //'Content-Type': 'text/html'  index.html 
      body: JSON.stringify(user)
    }).then(response => console.log(response))
      .catch(err => console.log(err));

    this.setState({
      username: ''
    })
    //Get
    fetch('http://localhost:4000/api/v1/users')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch( err => console.error(err.message));

    //Metodo Delete
    const deleteUser = async id => {
      try {
        const deleteUser = await fetch(`http://localhost:4000/api/v1/users/${id}`, {
          method: 'DELETE'
        });

        console.log(deleteUser);
      } catch (err){
        console.error(err.message);
      }
    }
    
    //Edit
    const updateUser = async e => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:4000/api/v1/users/${user.id}`,{
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        });

        //console.log(response);
        //window.location = '/';
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
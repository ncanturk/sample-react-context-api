import React, { Component } from 'react'
import UserConsumer from '../context'
import axios from 'axios'



class EditUser extends Component {
  state = {
    name: '',
    surname: '',
    team: '',
    error:false
  }
  changeInput = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  componentDidMount = async() => {


    const {id} = this.props.match.params;
    const response = await axios.get(`http://localhost:3004/users/${id}`)

    const {name,surname,team} = response.data;

    this.setState({
      name,
      surname,
      team
    })
  }

  validateForm = ()=>{
    const {name,surname,team} = this.state;
    if( name === '' || surname === ''|| team === ''){
      return false
    }
    return true
  }
  
  editUser = async(dispatch,e) =>{
    e.preventDefault();

    //Edit User 
    const {name,surname,team} =this.state;
    const {id} = this.props.match.params;
    const editedUser = {
      name,
      surname,
      team
    };
    if(!this.validateForm()){
      this.setState({
        error:true
      })
      return
    }

    const response = await axios.put(`http://localhost:3004/users/${id}`,editedUser)
    dispatch({type:"EDIT_USER", payload:response.data});
    //Redirect
    this.props.history.push("/");

  }
  render() {
    const {name,surname,team,error} = this.state
    return<UserConsumer>
    {
      value => {
        const {dispatch} = value;
        return (
          <div className="col-md-8 mb-4">
              <div className="card">
                <div className="card-header">
                  <h4>Edit User Form</h4>
                </div>
                  <div className="card-body">
                    <form onSubmit={this.editUser.bind(this,dispatch)}>
                      {
                        error ? <div className="alert alert-danger" role="alert">
                          Tüm input alanları doldurulmalıdır!
                        </div> :null
                      }
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input  type="text" 
                                name="name" 
                                id="name" 
                                placeholder="Enter Name"
                                className="form-control"
                                value= {name}
                                onChange={this.changeInput}
                                />
                      </div>
                      <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input  type="text" 
                                name="surname" 
                                id="surname" 
                                placeholder="Enter Surname"
                                className="form-control"
                                value= {surname}
                                onChange={this.changeInput}
                                />
                      </div>
                      <div className="form-group">
                        <label htmlFor="team">Team</label>
                        <input  type="text" 
                                name="team" 
                                id="team" 
                                placeholder="Enter Team"
                                className="form-control"
                                value= {team}
                                onChange={this.changeInput}
                                />
                      </div>
                      <button type="submit" className="btn btn-primary btn-block">Edit User</button>
                    </form>
                  </div>
              </div>
          </div>
        )
      }
    }
  </UserConsumer>

  }
}

export default EditUser;

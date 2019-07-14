import React, { Component } from 'react'
import posed from 'react-pose'
import UserConsumer from '../context'
import axios from 'axios'


 

const Animation = posed.div({
  visible:{
    opacity: 1,
    applyAtStart : {
      display : "block"
    }
  },
  hidden:{
    opacity: 0,
    applyAtEnd:{
      display : "none"
    }
  }
});



class AddUser extends Component {
  state = {
    visible: true,
    name: '',
    surname: '',
    team: '',
    error:false
  }
  onChangeVisible = () =>{
    this.setState({
      visible : !this.state.visible 
    })
  }
  validateForm = ()=>{
    const {name,surname,team} = this.state;
    if( name === '' || surname === ''|| team === ''){
      return false
    }
    return true
  }
  changeInput = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  addUser = async(dispatch,e) =>{
    e.preventDefault();
    const {name,surname,team} = this.state;
    
    const newUser ={
      name,
      surname,
      team
    }

    if(!this.validateForm()){
      this.setState({
        error:true
      })
      return
    }
    const response = await axios.post(`http://localhost:3004/users/`,newUser)
    dispatch({type: "ADD_USER", payload:response.data})
    this.props.history.push("/");
    
  }
  render() {
    const {visible,name,surname,team,error} = this.state
    return<UserConsumer>
    {
      value => {
        const {dispatch} = value;
        return (
          <div className="col-md-8 mb-4">
            <button onClick={this.onChangeVisible} className="btn btn-dark btn-block mb-2">{ visible ? "Hide Form" : "Show Form"}</button>
            <Animation pose = {visible ? "visible" : "hidden"}>
              <div className="card">
                <div className="card-header">
                  <h4>Add User Form</h4> 
                 </div>
                  <div className="card-body">
                    <form onSubmit={this.addUser.bind(this,dispatch)}>
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
                      <button type="submit" className="btn btn-primary btn-block">Add User</button>
                    </form>
                </div>
              </div>
            </Animation>
          </div>
        )
      }
    }
  </UserConsumer>

  }
}

export default AddUser;

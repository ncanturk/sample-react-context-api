import React, {Component} from 'react';
import PropTypes from 'prop-types'
import UserConsumer from '../context'
import axios from 'axios'
import {Link} from 'react-router-dom'


class User extends Component{


onDeleteUser = async (dispatch,e) =>{
    const {id} = this.props;
    await axios.delete(`http://localhost:3004/users/${id}`);
    dispatch({type:"DELETE_USER", payload:id});

}
componentWillUnmount() {
  console.log("componentWillUnmount")
}

componentWillUpdate(){
  console.log("wil did ")
}

  render(){
    const {id,name,surname,team} = this.props;
    return(
      <UserConsumer>
        {
          value => {
            const {dispatch} = value;
                return(
                  <div className="col-md-8 mb-4" >
                     <div className="card" > 
                      <div className="card-header justify-content-between">
                        <h4 className="d-inline">{name} {surname}</h4>
                        <i onClick = {this.onDeleteUser.bind(this,dispatch)} className="fa fa-trash-o" style={{cursor:"pointer"}}></i>
                      </div>
                      <div className="cart-body"> 
                        <p className="cart-text">Takım: {team}</p>
                      </div>
                      <Link to = {`edit/${id}`} className="btn btn-dark btn-block"> Edit User </Link>
                    </div>
                  </div>
                )
          }
        }
      </UserConsumer>
    )

  }
}

User.defaultProps = {
  name: "Bilgi yok",
  surname: "Bilgi yok",
  team: "Bilgi yok"
}
User.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired
}
export default User;
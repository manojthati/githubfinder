import React, { Component } from 'react'
import UserItem from './useritem'

class Users extends Component {
    render() {
        return (
            <div style={user.Style}>
                {this.props.users.map(user =>(
                    <useritem key={user.id} user={user} />
                ))}                                
            </div>
        );
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gripGap: '1rem'
};
export default Users

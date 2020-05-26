import React, { Component } from 'react'

class useritem extends Component {
    constructor(){
        this.state = {
            id: 'id',
            login: 'mojombo',
            avatarurl:'https://avatars0.githubusercontent.com/u/1?v=4',
            html_url:'https://github.com/mojombo'
        }
    }
    render() {
        return (
            <div>
                UserItem
            </div>
        )
    }
}

export default useritem

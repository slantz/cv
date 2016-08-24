import React, { Component } from 'react'
import {Link} from 'react-router'

export default class Landing extends Component {
    render() {
        return (
            <div>
              <h1>CV</h1>
              <Link activeStyle={{color: '#53acff'}} to='info'>INFO</Link>
            </div>
        )
    }
}

import React, { Component } from 'react'
import {Link} from 'react-router'

export default class Landing extends Component {
    render() {
        return (
            <article id="cv-landing">
              <div className="cv-logo i-inline-block i-transit-all beforeload">
                <div className="i-edge"></div>
                <Link className="i-inline-block" to='/info'>
                  <h1 className="text i-inline-block">CV</h1>
                </Link>
              </div>
              <h3 className="name i-transit-all i-inline-block">Alex Kobylinski</h3>
            </article>
        )
    }
}

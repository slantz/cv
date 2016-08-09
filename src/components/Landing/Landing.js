import React, { Component } from 'react'

export default class Landing extends Component {
    render() {
        const { hideLanding } = this.props
        return (
            <div id='tw-landing-overlay'>
                <h1 onClick={hideLanding} style={{cursor: 'pointer'}}>TWITT WARS (Click this text to Close)</h1>
            </div>
        )
    }
}

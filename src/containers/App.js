import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, IndexLink} from 'react-router'
import * as userActions from '../actions/UserActions'
import * as landingActions from '../actions/LandingActions'
import * as worldMapActions from '../actions/WorldMapActions'
import { WorldMap } from '../components/WorldMap'
import { RightPanel } from '../components/RightPanel'
import { Landing } from '../components/Landing'
import { Fire } from '../components/Notifications'

const styles = {
    mainStyles: {
        position: 'relative',
        zIndex: 0,
        display: 'flex'
    },
    mapStyles: {
        position: 'relative',
        zIndex: 0,
        display: 'flex',
        flex: '1 0'
    },
    sectionStyles: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0
    },
    asideStyles: {
        position: 'relative',
        zIndex: 0,
        backgroundColor: '#eee',
        height: '100vh',
        width: '200px',
        display: 'flex',
        flex: '1 0'
    },
    fireStyles: {
        position: 'absolute',
        bottom: '50px',
        transform: 'translateX(-50%)',
        left: '50%'
    },
    landingStyles: {
        backgroundColor: '#048CCD',
        color: '#fff',
        display: 'flex',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        fontWeight: 'bold',
        opacity: 0.8,
        zIndex: 2,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

class App extends Component {
    constructor(props) {
        super(props)
    }

    hideLanding = () => {
        const { landingActions: { hide }} = this.props
        hide()
    }
    
    render() {
        const {user, userActions, worldMap, worldMapActions, landing: { showLanding }} = this.props

        return (
            <main style={styles.mainStyles}>
                <section style={styles.mapStyles}>
                    <WorldMap worldMap={worldMap} worldMapActions={worldMapActions} />
                </section>
                <aside style={styles.asideStyles}>
                    <RightPanel user={user} userActions={userActions} />
                </aside>
                {showLanding && <section style={styles.landingStyles}>
                    <Landing hideLanding={this.hideLanding} />
                </section>}
                <section style={styles.fireStyles}>
                    <Fire />
                </section>
                <section style={styles.sectionStyles}>
                    <IndexLink activeStyle={{color: '#53acff'}} to='/'>Home</IndexLink> {/*same as <Link onlyActiveOnIndex...*/}
                    <Link activeStyle={{color: '#53acff'}} to='profile'>Профиль (требуется
                        авториз)</Link> {/*use activeClassName instead of activeStyle*/}
                    <Link activeStyle={{color: '#53acff'}} to='fake_link'>Фэйковый урл (выдаст 404)</Link>

                    {/* тут генерятся дочерние страницы указанные в роутере */}
                    {this.props.children}
                </section>
            </main>
        )
    }
}

// Все что хотим вытащить из стора указываем здесь, после чего они будут доступны в компоненте (App) через this.props
function mapStateToProps(state) {
    return {
        user: state.user,
        landing: state.landing,
        worldMap: state.worldMap
    }
}


// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        landingActions: bindActionCreators(landingActions, dispatch),
        worldMapActions: bindActionCreators(worldMapActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

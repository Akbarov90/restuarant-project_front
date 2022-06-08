import React, {useState} from 'react'
import {Route, Redirect} from 'react-router-dom'

function GlobalProtected({component: Component, a, ...rest}) {

    const [log, setLog] = useState(true);

    return (
        <Route {...rest} render={(props) =>
            localStorage.getItem('posToken') &&
            (a ? true : log) ? <Component {...props} /> :
                <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}/>
    )
}

export default GlobalProtected
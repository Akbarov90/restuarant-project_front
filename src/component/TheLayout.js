import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getProfileData, updateLang} from "../store/auth/auth";
import {Base64} from "js-base64";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import Notification from "./notification/Notification";
import Sidebar from "./sidebar/Sidebar";
import {_route} from "../route/_route";

function TheLayout(props) {

    const dispatch = useDispatch();
    const {roleSupperAdmin, roleAdmin, roleUser, language} = useSelector(state => state.auth)
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [lineActive, setLineActive] = useState(localStorage.getItem('Line-Active'))

    useEffect(() => {
        if (localStorage.getItem('Authority')) {
            dispatch(getProfileData(JSON.parse(Base64.decode(localStorage.getItem('Authority')))))
        }
        if (!localStorage.getItem('Line-Active')) {
            localStorage.setItem('Line-Active', '1')
        }
    }, [dispatch])

    useEffect(() => {
        setLineActive(localStorage.getItem('Line-Active'))
    }, [localStorage.getItem('Line-Active')])

    function updateLanguage(value) {
        dispatch(updateLang(value))
    }

    function line(id) {
        localStorage.setItem('Line-Active', id)
    }

    const children = <>
        <ul>
            {_route.map(item => {
                if (item.type) {
                    if (item.roleSupperAdmin === roleSupperAdmin || item.roleAdmin === roleAdmin || item.roleUser === roleUser || item.role) {
                        if (item.a && props.a || item.b || !item.a && !props.a) {
                            return <Link to={item.to}><li onClick={() => line(item.key)}
                                    className={lineActive === item.key ? 'line-active' : ''} key={item.key}>
                                    {item.icon} {item.name[language]}</li>
                            </Link>
                        }
                    }
                }
            })}
        </ul>
    </>

    return (
        <div>
            <Notification language={language}/>
            <Sidebar children={children} open={sidebarOpen} className="sidebar-menu" setSidebar={setSidebarOpen}
                     updateLanguage={updateLanguage} language={language}/>

            <Switch>
                {_route.map(item =>
                    (item.roleSupperAdmin === roleSupperAdmin || item.roleAdmin === roleAdmin || item.roleUser === roleUser || item.role) ?
                        <Route exact={true} path={item.path} component={item.component}/>
                        : ''
                )}
                <Redirect from="/**" to="/error404"/>
            </Switch>
        </div>
    );
}

export default TheLayout

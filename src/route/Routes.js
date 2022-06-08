import React, {Suspense, lazy} from 'react';
import {Switch, Route} from "react-router-dom";
import GlobalProtected from "./GlobalProtected";
import Loading from "../view/loading/Loading";
import SignUp from "../view/login/SignUp";
import error500 from "../component/errorPage/error500";
import error404 from "../component/errorPage/error404";
import error403 from "../component/errorPage/error403";

const Login = lazy(() => import('../view/login/Login'))
const TheLayout = lazy(() => import('../component/TheLayout'))

function Routes() {
    // const [role, setRole] = useState(localStorage.getItem('authority'))
    //
    // useEffect(()=>{
    //     setRole(localStorage.getItem('authority'))
    // },[localStorage.getItem('authority')])

    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Route path={'/login'} component={Login}/>
                <Route path={'/sign-up'} component={SignUp} />
                <Route path={'/error500'} component={error500} />
                <Route path={'/error404'} component={error404} />
                <Route path={'/error403'} component={error403} />
                <GlobalProtected path={'/:id/**'} a={true} component={props=><TheLayout {...props} a={true}/>}/>
                <GlobalProtected path={'/'} a={false} component={props=><TheLayout {...props} a={false}/>}/>
            </Switch>
        </Suspense>
    )
}

export default Routes

import axios from 'axios'
import {statusTrue} from '../status/status'
import {Base64} from "js-base64";
import {updateProfileLang, apiAuthLogin} from "../../view/admin/config";

const api = ({dispatch}) => (next) => (action) => {
// debugger
    if (action.type !== 'api/apiCall' && action.type) {
        next(action);
        return
    }

    next(action);

    const token = localStorage.getItem("posToken");

    const {url, method, params, data, onStart, onSuccess, onFail} = action.payload;

    const authorization = token ? {"Authorization": `Bearer ${Base64.decode(token)}`} : null;

    // debugger
    dispatch({type: onStart});

    axios({
        baseURL: 'http://104.236.67.87:8087/',
        url,
        method,
        params,
        headers: authorization,
        data
    }).then(res => {
        // console.log(res.data.data.data)
        if (res.status === 200 && res.data.message.code === 0) {
            dispatch({
                type: onSuccess,
                payload: res.data
            })
            if (method !== 'get' && url !== updateProfileLang + 0 && url !== updateProfileLang + 1
                && url !== updateProfileLang + 2 && url !== apiAuthLogin && url !== 'api/product/filter') {
                dispatch({
                    type: statusTrue.type,
                    payload: res.data
                })
            }
        } else {
            dispatch({
                type: statusTrue.type,
                payload: res.data.message
            });
            dispatch({
                type: onFail,
                payload: res.data.message
            })
        }
    }).catch(err => {
        dispatch({
            type: statusTrue.type,
            payload: err
        });
        dispatch({
            type: onFail,
            payload: err.response
        })
    })

};


export default api
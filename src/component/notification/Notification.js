import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import {statusFalse} from "../../store/status/status";
import {toast} from "react-hot-toast";
import {Language} from "../language/Language";

function Notification() {

    const dispatch = useDispatch();
    const history = useHistory()
    const {status, type} = useSelector(state => state.status);
    const {language} = useSelector(state => state.auth);

    const {NetworkError} = Language

    if (status === 'Network Error' && type) {
        toast.error(NetworkError[language])
        dispatch(statusFalse())
    } else if (status.status === 404 && type) {
        history.push('/error404')
        dispatch(statusFalse())
    } else if (status.status === 403 && type) {
        history.push('/error403')
        dispatch(statusFalse())
    } else if (status.status === (400 || 405 || 415) && type) {
        toast.error(status.data?.error)
        dispatch(statusFalse())
    } else if (status.code === 101 && type) {
        toast.error('Пользователь недоступен')
        dispatch(statusFalse())
    } else if (status.status === 401 && type) {
        toast.error('Неправильный пароль')
        dispatch(statusFalse())
    } else if (status.code === 0 && type) {
        toast.success(language === 0 ? status.messageUz : language === 1 ? status.messageRu : status.message)
        dispatch(statusFalse())
    } else if (status.code === 1 && type) {
        toast.error(language === 0 ? status.messageUz : language === 1 ? status.messageRu : status.message)
        dispatch(statusFalse())
    } else if (status.code === 105 && type) {
        toast.error(language === 0 ? status.messageUz : language === 1 ? status.messageRu : status.message)
        dispatch(statusFalse())
    } else if (status.status === 500 && type) {
        toast.error(language === 0 ? status.messageUz : language === 1 ? status.messageRu : status.message)
        dispatch(statusFalse())
    } else if (status.code === 1006 && type) {
        toast.error(language === 0 ? status.messageUz : language === 1 ? status.messageRu : status.message)
        dispatch(statusFalse())
    }

    return null
}

export default Notification
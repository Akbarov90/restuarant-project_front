import {useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {loginStart, loadingFalse, getProfile} from "../../store/auth/auth";
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import Notification from "../../component/notification/Notification";
import './style.css'

function Login() {

    const history = useHistory();
    const dispatch = useDispatch();

    const {isLoading, data, profileData, roleSupperAdmin, roleAdmin, roleUser} = useSelector(state => state.auth);

    const [language, setLanguage] = useState((localStorage.getItem("language")));

    useEffect(() => {
        dispatch(loadingFalse());
        localStorage.clear();
    }, []);

    useEffect(() => {
        if (profileData.code === 0) {
            if (localStorage.getItem('posToken')) {
                if(roleSupperAdmin){
                    history.push('/')
                }else if(roleAdmin){
                    history.push('/admin')
                }else if(roleUser){
                    history.push('/user')
                }else{
                    history.push('/login')
                }
            }
        }
    }, [profileData])

    useEffect(() => {
        if (data.code === 0 && localStorage.getItem('posToken')) {
            dispatch(getProfile())
        }
    }, [data]);

    function onFinish(values) {
        dispatch(loginStart(values))
    }

    return (
        <div className="App">
            <Notification language={language}/>
            <div className="form-login">
                <Form onFinish={onFinish}>
                    <Form.Item name={'username'}>
                        <Input style={{borderRadius: 8}} prefix={<UserOutlined/>} placeholder={'Имя пользователя'} required/>
                    </Form.Item>
                    <Form.Item name={'password'}>
                        <Input.Password  style={{borderRadius: 8}} prefix={<LockOutlined/>} placeholder={'Пароль'} required/>
                    </Form.Item>
                    <Form.Item>
                        <Button className="login-btn" style={{margin: "auto",color: "#2F403A", borderColor: "#2F403A", backgroundColor: "#F9E0B9", borderRadius: 8}} type={'primary'} loading={isLoading} htmlType={'submit'}>
                            Войти
                        </Button>
                    </Form.Item>
                    <span style={{color: 'white'}}>У вас ещё нет аккаунта?</span><Link
                    to={'/sign-up'} style={{color: "#F9E0B9"}}>{' Зарегистрироваться'}</Link>
                </Form>
            </div>
        </div>
    );
}

export default Login;
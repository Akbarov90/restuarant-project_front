import { useDispatch, useSelector } from 'react-redux'
import { signUpStart } from '../../store/auth/auth'
import { Button, Form, Input } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import './style.css'
import { useEffect } from 'react'

function SignUp() {
    const dispatch = useDispatch()
    const { isLoading, signUpData } = useSelector(state => state.auth)

    const history = useHistory()

    useEffect(() => {
        if (signUpData.code === 0) {
            history.replace('/login')
        }
    }, [signUpData, history])

    function onFinish(values) {
        dispatch(signUpStart(values))
    }

    return (
        <div className="App">
            <div className="form-login">
                <Form style={{borderRadius: 8}} onFinish={onFinish}>
                    <Form.Item name={'firstName'}>
                        <Input style={{borderRadius: 8}} placeholder={'firstname'} required/>
                    </Form.Item>
                    <Form.Item name={'lastName'}>
                        <Input style={{borderRadius: 8}} placeholder={'lastname'} required/>
                    </Form.Item>
                    <Form.Item name={'username'}>
                        <Input style={{borderRadius: 8}} placeholder={'username'} required/>
                    </Form.Item>
                    <Form.Item name={'email'}>
                        <Input style={{borderRadius: 8}} placeholder={'email'} required/>
                    </Form.Item>
                    <Form.Item name={'phone'}>
                        <Input style={{borderRadius: 8}} placeholder={'phone'} required/>
                    </Form.Item>
                    <Form.Item name={'password'}>
                        <Input.Password style={{borderRadius: 8}} placeholder={'Пароль'} required/>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{margin: "auto",color: "#2F403A", borderColor: "#2F403A", backgroundColor: "#F9E0B9", borderRadius: 8}} type={'primary'} loading={isLoading} htmlType={'submit'}>
                            Регистрация
                        </Button>
                    </Form.Item>
                    <span style={{color: 'white'}}>Есть аккаунт?</span><Link to={'/login'} style={{color: "#F9E0B9"}}>{' Вход'}</Link>
                </Form>
            </div>
        </div>
    )
}

export default SignUp

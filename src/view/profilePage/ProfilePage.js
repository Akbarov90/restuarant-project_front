import {Button, Col, Form, Input, Row, Tabs,Upload, message,} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {updatePass, updateUser} from "../../store/auth/auth";
import {Base64} from "js-base64";
import {Language} from '../../component/language/Language'
import {toast} from "react-hot-toast";
import './ProfilePage.css'
import { CameraOutlined } from '@ant-design/icons';

function ProfilePage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const {isLoading, language, checkCode} = useSelector(state => state.auth);
    const [user] = useState(JSON.parse(Base64.decode(localStorage.getItem('Authority'))).data);

    const {TabPane} = Tabs;

    const firstLatter = user?.firstName?.split('');

    const {
        userName, firstname, lastname, Email, Phone, oldPassword, newPassword, repeatThePassword, saveBtn,
        cancelBtn, password, userInfo, Alert
    } = Language;

    const {firstName, lastName, username, phone, email, id} = user;

    useEffect(() => {
        if (checkCode?.code === 0) history.push('/login')
    }, [checkCode])

    useEffect(() => {
        toast(Alert[user.language], {duration: 6000,});
        localStorage.setItem('Line-Active', '3')
    }, [])

    function submitProfileData(values) {
        dispatch(updateUser({...values, id}))
    }

    function updatePassword(values) {
        dispatch(updatePass(values.currentPass, values.newPass))
    }

    //Upload

    const props = {
        // name: 'file',
        // onChange(info) {
        //     if (info.file.status !== 'uploading') {
        //         console.log(info.file, info.fileList);
        //     }
        //     if (info.file.status === 'done') {
        //         message.success(`${info.file.name} file uploaded successfully`);
        //     } else if (info.file.status === 'error') {
        //         message.error(`${info.file.name} file upload failed.`);
        //     }
        // },
    };

    return (
        <div className={'profile-page'}>
            <Row style={{height: '350px'}}>
                <Col className="profile-page-col-6" span={8}>
                    <div className={'profile-page-icon'}>
                        <h2 className={'first-latter'}>{firstLatter ? firstLatter[0] : ''}</h2>
                    </div>
                    <h2 className={'profile-page-fullName'}>{user.firstName + ' ' + user.lastName}</h2>
                        <Button htmlType={'upload'} icon={<CameraOutlined />}/>
                </Col>
                <Col span={15} className="profile-page-col-18" offset={1}>
                    <div className={'profile-page-form'}>
                        <Tabs defaultActiveKey={'1'}>
                            <TabPane
                                tab={userInfo[language]}
                                key="1">
                                <Form onFinish={submitProfileData}>
                                    <Form.Item initialValue={username} label={userName[language]}
                                               name={'username'}>
                                        <Input required/>
                                    </Form.Item>
                                    <Form.Item initialValue={firstName} label={firstname[language]} name={'firstName'}>
                                        <Input required/>
                                    </Form.Item>
                                    <Form.Item initialValue={lastName} label={lastname[language]} name={'lastName'}>
                                        <Input required/>
                                    </Form.Item>
                                    <Form.Item initialValue={email} label={Email[language]} name={'email'}>
                                        <Input required/>
                                    </Form.Item>
                                    <Form.Item initialValue={phone} label={Phone[language]} name={'phone'}>
                                        <Input required/>
                                    </Form.Item>
                                    <Form.Item style={{float: "right"}}>
                                        <Button style={{marginRight: 10}}
                                                htmlType={'button'} className="button-default"
                                                onClick={() => window.history.back()}>{cancelBtn[language]}
                                        </Button>
                                        <Button loading={isLoading} htmlType={'submit'} className="button-default">
                                            {saveBtn[language]}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                            <TabPane
                                tab={password[language]} key="2">
                                <Form onFinish={updatePassword}>
                                    <Form.Item label={oldPassword[language]} name={'currentPass'}>
                                        <Input.Password required/>
                                    </Form.Item>
                                    <Form.Item label={newPassword[language]} name={'newPass'} hasFeedback>
                                        <Input.Password required/>
                                    </Form.Item>
                                    <Form.Item label={repeatThePassword[language]} name={'repeatThePassword'}
                                               dependencies={['newPass']} hasFeedback
                                               rules={[
                                                   ({getFieldValue}) => ({
                                                       validator(_, value) {
                                                           if (!value || getFieldValue('newPass') === value) {
                                                               return Promise.resolve()
                                                           }
                                                           return Promise.reject(new Error('The two password that you do not match!'))
                                                       }
                                                   })
                                               ]}>
                                        <Input.Password required/>
                                    </Form.Item>
                                    <Form.Item style={{float: "right"}}>
                                        <Button style={{marginRight: 10}} htmlType={'button'} className="button-default"
                                                onClick={() => window.history.back()}>{cancelBtn[language]}
                                        </Button>
                                        <Button loading={isLoading} htmlType={'submit'} className="button-default">
                                            {saveBtn[language]}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProfilePage
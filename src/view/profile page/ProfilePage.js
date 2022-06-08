import { Button, Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import { Base64 } from 'js-base64'
import './ProfilePage.css'
import { Language } from '../../component/language/Language'

function ProfilePage({ language }) {
    const [user, setUser] = useState(JSON.parse(Base64.decode(localStorage.getItem('Authority'))))

    const firstLatter = user?.firstName?.split('')

    const {
        userName,
        firstName,
        lastName,
        email,
        phone,
        oldPassword,
        newPassword,
        repeatThePassword,
        saveBtn,
        cancelBtn,
    } = Language

    function submit(values) {
        console.log(values)
    }

    let isLoading
    return (
        <div className={'profile-page'}>
            <Row>
                <Col span={8} className={'profile-page-col-6'}>
                    <div className={'profile-page-icon'}>
                        <h2 className={'first-latter'}>{firstLatter ? firstLatter[0] : ''}</h2>
                    </div>
                    <h2 className={'profile-page-fullName'}>
                        {user.firstName + ' ' + user.lastName}
                    </h2>
                </Col>
                <Col span={15} className={'profile-page-col-18'}>
                    <div className={'profile-page-form'}>
                        <Form onFinish={submit}>
                            <Form.Item label={userName[language]}>
                                <Input defaultValue={user.username} required />
                            </Form.Item>
                            <Form.Item label={firstName[language]}>
                                <Input defaultValue={user.firstName} required />
                            </Form.Item>
                            <Form.Item label={lastName[language]} name={'lastName'}>
                                <Input defaultValue={user.lastName} required />
                            </Form.Item>
                            <Form.Item label={email[language]} name={'email'}>
                                <Input defaultValue={user.email} required />
                            </Form.Item>
                            <Form.Item label={phone[language]} name={'phone'}>
                                <Input defaultValue={user.phone} required />
                            </Form.Item>
                            <Form.Item label={oldPassword[language]} name={'oldPassword'}>
                                <Input.Password required />
                            </Form.Item>
                            <Form.Item label={newPassword[language]} name={'newPassword'}>
                                <Input.Password required />
                            </Form.Item>
                            <Form.Item
                                label={repeatThePassword[language]}
                                name={'repeatThePassword'}
                            >
                                <Input.Password required />
                            </Form.Item>
                            <Form.Item style={{ float: 'right' }}>
                                <Button
                                    style={{
                                        backgroundColor: 'red',
                                        borderColor: 'red',
                                        marginRight: 10,
                                    }}
                                    type={'primary'}
                                    htmlType={'button'}
                                >
                                    {cancelBtn[language]}
                                </Button>
                                {isLoading ? (
                                    <h1>Loading...</h1>
                                ) : (
                                    <Button type={'primary'} htmlType={'submit'}>
                                        {saveBtn[language]}
                                    </Button>
                                )}
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProfilePage

import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getUser, signUpStart, updateUser, roleUser} from "../../store/auth/auth";
import {Language} from '../../component/language/Language';
import {EditOutlined} from "@ant-design/icons";
import {Button, Form, Input, Select, Pagination} from "antd";
import Modal from "../../component/modal/Modal";
import Loading from "../loading/Loading";
import {Option} from "antd/es/mentions";
import MyLoader from "../loading/MyLoader";

function UserList() {
    const dispatch = useDispatch()
    const {language, user, isLoading, data, roleProfile } = useSelector(state => state.auth)
    const [modalVisible, setModalVisible] = useState(false)
    const [edit, setEdit] = useState('')
    const [option, setOption] = useState('')

    useEffect(() => {
        if (data.code === 0) {
            dispatch(getUser())
            toggle()
        }
    }, [data])

    useEffect(() => {
        dispatch(getUser())
        dispatch(roleUser())
        localStorage.setItem('Line-Active', '6')
    }, [])

    const {userName, Phone, Email, Role, add, firstname, lastname, password, updateProfile, cancelBtn} = Language
    const {username, firstName, lastName, phone, email, roles} = edit

    function toggle() {
        setEdit('')
        setModalVisible(prev => !prev)
    }

    function editItem(item) {
        setOption(item.roles.id)
        setEdit(item)
        setModalVisible(true)
    }

    function onFinish(values) {
        if (edit)dispatch(updateUser({...values, rolesId: option, id: edit.id}))
        else dispatch(signUpStart({...values, rolesId: option}))
    }

    function handleChange(value) {
        setOption(value)
    }

    const modalForm = <>
        <Form onFinish={onFinish} className="modal-response">
            <Form.Item label={userName[language]} initialValue={username} name={'username'}>
                <Input required/>
            </Form.Item>
            <Form.Item label={firstname[language]} initialValue={firstName} name={'firstName'}>
                <Input  required/>
            </Form.Item>
            <Form.Item label={lastname[language]} initialValue={lastName} name={'lastName'}>
                <Input  required/>
            </Form.Item>
            <Form.Item label={Email[language]} initialValue={email} name={'email'}>
                <Input required/>
            </Form.Item>
            <Form.Item label={Phone[language]} initialValue={phone} name={'phone'}>
                <Input required/>
            </Form.Item>
            {!edit ?
                <Form.Item label={password[language]} name={'password'}>
                    <Input.Password className="Input-Password"  required/>
                </Form.Item>
                : ''}
            <Form.Item label={Role[language]}>
                <Select
                    className="Input-Select"
                    defaultValue={roles?.map(i => i.id)}
                    mode="multiple"
                    onChange={handleChange}
                >
                    {roleProfile?.map(item => <Option
                        key={item.id} value={item.id}>{item.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button loading={isLoading} className="modal-buttons" htmlType={'submit'}>
                    {edit ? updateProfile[language] : add[language]}
                </Button>
                <Button htmlType={'button'}
                        className="modal-buttons"
                        onClick={toggle}>
                    {cancelBtn[language]}
                </Button>
            </Form.Item>
        </Form>
    </>

    return (
        <div className={'container-list'}>
            <div>
                <button className={'modal-btn'} onClick={toggle}>{add[language]}</button>
            </div>

            {modalVisible &&
                <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} toggle={toggle} edit={edit}
                       modalForm={modalForm}/>}

            <>
                {isLoading ? <MyLoader /> : <table className={'table'}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>{userName[language]}</th>
                        <th>{Email[language]}</th>
                        <th>{Phone[language]}</th>
                        <th>{Role[language]}</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? <Loading/> : user.map((item, index) => <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.roles?.map(i =>
                            <>{i.name} <br/></>
                        )}
                        </td>
                        <td className={'table-tools'}>
                            <div className={'table-buttons'} onClick={() => editItem(item)}><EditOutlined/></div>
                            {/*<div className="table-buttons">*/}
                            {/*    <Popconfirm*/}
                            {/*        title="Are you sure to delete this task?"*/}
                            {/*        onConfirm*/}
                            {/*        onCancel*/}
                            {/*        okText="Yes"*/}
                            {/*        cancelText="No">*/}
                            {/*        <DeleteOutlined/>*/}
                            {/*    </Popconfirm>*/}
                            {/*</div>*/}
                        </td>
                    </tr>)}
                    </tbody>
                </table>}
            </>
            <div className={'pagination'}>
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </div>
    )
}

export default UserList
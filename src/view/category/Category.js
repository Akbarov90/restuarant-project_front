import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getCategory, addCategory, updateCategory, deleteCategory,
} from '../../store/category/category'
import { useParams } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Modal from '../../component/modal/Modal'
import {Button, Form, Input, Pagination, Popconfirm, Select} from "antd";
import Loading from "../loading/Loading";
import {Language} from "../../component/language/Language";
import MyLoader from "../loading/MyLoader";
import './category.css'

function Category() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const {category, data, isLoading, loading, pageCount} = useSelector(state => state.category)
    const {language, roleSupperAdmin} = useSelector(state => state.auth)
    const [modalVisible, setModalVisible] = useState(false)
    const [edit, setEdit] = useState('')
    const [pagination, setPagination] = useState(1)
    const {name} = edit
    const {Category, updateProfile, add, cancelBtn, Selectt, Name, NoData, Warning, Ok, No} = Language

    useEffect(() => {
        if (data.code === 0) {
            setEdit('')
            setModalVisible(false)
            dispatch(getCategory({restaurantId: id, page: pagination - 1}))
        }
        localStorage.setItem('Line-Active', '4')
        dispatch(getCategory({restaurantId: id, page: pagination - 1}))
    }, [data]);

    function toggle() {
        setEdit('');
        setModalVisible(prev => !prev)
    }

    function editItem(item) {
        setEdit(item);
        setModalVisible(true)
    }

    function onFinish(values) {
        if (edit) dispatch(updateCategory({name: values.name, id: edit.id}))
        else dispatch(addCategory({...values, restaurantId: id}))
    }

    const modalForm = <>
        <Form onFinish={onFinish}>
            <Form.Item label={Name[language]} name={'name'} initialValue={name}>
                <Input required/>
            </Form.Item>
            <Form.Item name={'categoryId'} label={Category[language]} required>
                <Select className="select-button" placeholder={Selectt[language]}>
                    {category.map((item) => <Select.Option value={item.id}
                                                           key={item.id}>{item.name}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button loading={loading} className="modal-buttons" htmlType={'submit'}>
                    {edit ? updateProfile[language] : add[language]}
                </Button>
                <Button className="modal-buttons" htmlType={'button'} onClick={toggle}>
                    {cancelBtn[language]}
                </Button>
            </Form.Item>
        </Form>
    </>
    console.log(pageCount)

    return (
        <>
            <div className="container">
                <div>
                    <button className={'modal-btn'} onClick={toggle}>{add[language]}</button>
                </div>

                {modalVisible &&
                <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} toggle={toggle} edit={edit}
                       modalForm={modalForm}/>}

                {isLoading ? <MyLoader/> : category.length > 0 ? <table className={'table'}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>{Name[language]}</th>
                        <th className="table-th"/>
                    </tr>
                    </thead>
                    <tbody>
                    {category.map((item, index) => isLoading ? <Loading/> : <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td className={'table-tools'}>
                            <div className="card-footer">
                                <div className="table-buttons" onClick={() => editItem(item)}><EditOutlined/></div>
                                <Popconfirm
                                    title={Warning[language]}
                                    onConfirm={() => dispatch(deleteCategory(item.id))}
                                    okText={Ok[language]} cancelText={No[language]}>
                                    <div className="table-buttons">
                                        <DeleteOutlined/>
                                    </div>
                                </Popconfirm>
                            </div>
                        </td>
                    </tr>)}
                    </tbody>
                </table> : <div className={'no-data'}><h2>{NoData[language]}</h2></div>}
                <div className={'pagination'}>
                    {category.length > 0 && <Pagination onChange={(e) => setPagination(e)} defaultCurrent={pagination}
                                                       total={pageCount * 10} responsive={true}
                                                       showQuickJumper={true}/>}
                </div>
            </div>
        </>
    )
}

export default Category
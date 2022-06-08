import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
    getFoodCategory,
    addFoodCategory,
    updateFoodCategory,
    deleteFoodCategory
} from "../../../store/category/foodCategory/foodCategory";
import Modal from "../../../component/modal/Modal";
import {Language} from "../../../component/language/Language";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, Form, Input, Pagination, Popconfirm, Select} from "antd";
import MyLoader from "../../loading/MyLoader";
import Loading from "../../loading/Loading";

function FoodCategory({match}) {

    const iD = match.params.id
    const dispatch = useDispatch()
    const {language} = useSelector(state => state.auth)
    const {foodCategory, dataFoodCategory, isLoading, loading, pageCount} = useSelector(state => state.foodCategory)
    const [modalVisible, setModalVisible] = useState(false)
    const [edit, setEdit] = useState('')
    const [pagination, setPagination] = useState(1)

    const {add, Name, NoData, Warning, Ok, No, cancelBtn, Category, Selectt, updateProfile} = Language

    useEffect(() => {
        if (dataFoodCategory.code === 0) {
            setModalVisible(false)
            setEdit('')
            dispatch(getFoodCategory({restaurantId: iD, page: pagination - 1}))
        }
        localStorage.setItem('Line-Active', '8')
        dispatch(getFoodCategory({restaurantId: iD, page: pagination - 1}))
    }, [dataFoodCategory])

    function toggle() {
        setEdit('')
        setModalVisible(prev => !prev)
    }

    function editItem(item) {
        console.log(item)
        setEdit(item)
        setModalVisible(true)
    }

    function onFinish(values) {
        console.log(values)
        if (edit) dispatch(updateFoodCategory({name: values.name, id: edit.id}))
        else dispatch(addFoodCategory({...values, restaurantId: iD}))
    }

    const modalForm = <>
        <Form onFinish={onFinish}>
            <Form.Item label={Name[language]} name={'name'} initialValue={edit.name}>
                <Input required/>
            </Form.Item>
            <Form.Item name={'foodCategoryId'} initialValue={edit.foodCategoryId} label={Category[language]} required>
                <Select className="select-button" placeholder={Selectt[language]}>
                    {foodCategory.map((item) => <Select.Option value={item.id}
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
    return (
        <>
            <div className={'container'}>
                <>
                    <button className={'modal-btn'} onClick={toggle}>{add[language]}</button>
                </>

                {modalVisible &&
                <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} toggle={toggle} edit={edit}
                       modalForm={modalForm}/>}

                {isLoading ? <MyLoader/> : foodCategory.length > 0 ? <table className={'table'}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>{Name[language]}</th>
                        <th className="table-th"/>
                    </tr>
                    </thead>
                    <tbody>
                    {foodCategory.map((item, index) => isLoading ? <MyLoader/> : <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td className={'table-tools'}>
                            <div className="card-footer">
                                <div className="table-buttons" onClick={() => editItem(item)}><EditOutlined/></div>
                                <Popconfirm
                                    title={Warning[language]}
                                    onConfirm={() => dispatch(deleteFoodCategory(item.id))}
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
                    {foodCategory.length > 0 &&
                    <Pagination onChange={(e) => setPagination(e)} defaultCurrent={pagination}
                                total={pageCount} responsive={true}
                                showQuickJumper={true}/>}
                </div>
            </div>
        </>
    );
}

export default FoodCategory;
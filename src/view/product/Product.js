import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProduct, addProduct, updateProduct, deleteProduct, filterProduct} from "../../store/product/product";
import {Button, Form, Input, Pagination, Popconfirm, Select} from "antd";
import {Language} from "../../component/language/Language";
import {getCategory} from "../../store/category/category";
import Modal from "../../component/modal/Modal";
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import MyLoader from "../loading/MyLoader";
import "./product.css"

function Product({match}) {


    const {id} = match.params
    const dispatch = useDispatch()
    const {product, isLoading, dataProduct, loading, pageCount, filter} = useSelector(state => state.product)
    const {language} = useSelector(state => state.auth)
    const {category, data} = useSelector(state => state.category)

    const [modalVisible, setModalVisible] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [edit, setEdit] = useState('')
    const [pagination, setPagination] = useState(1)
    const {
        Selectt, Category, add, cancelBtn, updateProfile, Name, BarCode, RestName, NoData, Warning, Ok, No
    } = Language

    useEffect(() => {
        dispatch(getCategory({restaurantId: id, page: pagination - 1}))
    }, [data]);

    useEffect(() => {
        if (dataProduct.code === 0) {
            setEdit('')
            setModalVisible(false)
            dispatch(getProduct({restaurantId: id, page: pagination - 1}))
        }
        localStorage.setItem('Line-Active', '7')
        dispatch(getProduct({restaurantId: id, page: pagination - 1}))
    }, [dataProduct])

    // useEffect(() => {
    //     dispatch(filterProduct({name: search}, {restaurantId: id}))
    // }, [search])

    function toggle() {
        setEdit('');
        setModalVisible(prev => !prev)
    }

    function editItem(item) {
        setEdit(item);
        setModalVisible(true)
    }

    function onFinish(values) {
        if (edit) dispatch(updateProduct({...values, id: edit.id, idRes: Number(id)}))
        else dispatch(addProduct({...values, restaurantId: id}))
    }

    const modalForm = <>
        <Form onFinish={onFinish}>
            <Form.Item label={Name[language]} name={'name'} initialValue={edit.name}>
                <Input required/>
            </Form.Item>
            <Form.Item label={BarCode[language]} name={'barCode'} initialValue={edit.bar_code}>
                <Input type={"number"} required/>
            </Form.Item>
            <Form.Item name={'categoryId'} label={Category[language]} initialValue={edit.category_id}>
                <Select className={"select-button"} placeholder={Selectt[language]}>
                    {category.map((item) => <Select.Option value={item.id}
                                                           key={item.id}>{item.name}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button className="modal-buttons" loading={loading} htmlType={'submit'}>
                    {edit ? updateProfile[language] : add[language]}
                </Button>
                <Button className="modal-buttons" htmlType={'button'} onClick={toggle}>
                    {cancelBtn[language]}
                </Button>
            </Form.Item>
        </Form>
    </>

    useEffect(()=>{
        if(searchName === '') {
            dispatch(getProduct({restaurantId: id, page: pagination - 1}))
        }
    },[searchName])

    function onSearch(values){
        dispatch(filterProduct(values, {restaurantId: id}))
    }

    return (
        <>
            <div className={'container'}>
                <div className="rows">
                    <div className={'search-box'}>
                        <Form style={{display:"flex"}} onFinish={onSearch}>
                            <Form.Item name={'name'}>
                                <Input onChange={(e)=>setSearchName(e.target.value)} className="search" allowClear/>
                            </Form.Item>
                            <Form.Item>
                                <button className="search searchch" htmlType={"submit"}><SearchOutlined /></button>
                            </Form.Item>
                        </Form>
                    </div>

                    <button className={'modal-btn'} style={{marginTop: 10}} onClick={toggle}>{add[language]}</button>
                </div>

                {modalVisible &&
                <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} toggle={toggle} edit={edit}
                       modalForm={modalForm}/>}

                {isLoading ? <MyLoader /> :   product.length > 0 ? <table className={'table'}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>{Name[language]}</th>
                        <th>{BarCode[language]}</th>
                        <th>{Category[language]}</th>
                        <th>{RestName[language]}</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        product.map((item, index) => <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.bar_code}</td>
                            <td>{item.category_name}</td>
                            <td>{item.restaurant_name}</td>
                            <td className="table-tools">
                                <div className="table-buttons" onClick={() => editItem(item)}><EditOutlined/></div>
                                <Popconfirm
                                    title={Warning[language]}
                                    onConfirm={() => dispatch(deleteProduct(item.id))}
                                    onCancel okText={Ok[language]} cancelText={No[language]}>
                                    <div className="table-buttons">
                                        <DeleteOutlined/>
                                    </div>
                                </Popconfirm>
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table> : <div className={'no-data'}><h2>{NoData[language]}</h2></div>}
                <div className={'pagination'}>
                    {product.length > 0 && <Pagination onChange={(e) => setPagination(e)} defaultCurrent={pagination}
                                                    total={Math.ceil(pageCount / 20) * 10} responsive={true}
                                                    showQuickJumper={true}/>}
                </div>
            </div>
        </>
    );
}

export default Product
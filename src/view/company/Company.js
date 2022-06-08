import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getCompany, addCompany, updateCompany, deleteCompany} from "../../store/company/company";
import Modal from "../../component/modal/Modal";
import {Language} from "../../component/language/Language";
import {Button, Form, Input, Pagination, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import MyLoader from "../loading/MyLoader";

function Company({match}) {

    const iD = match.params.id
    const dispatch = useDispatch()
    const {isLoading, company, dataCompany, pageCount, loading} = useSelector(state => state.company)
    const {language} = useSelector(state => state.auth)

    const [modalVisible, setModalVisible] = useState(false)
    const [pagination, setPagination] = useState(1)
    const [edit, setEdit] = useState('')

    const {name, address, phone, id} = edit;

    const {add, Name, NoData, Warning, Ok, No, cancelBtn, Address, Phone, updateProfile} = Language

    useEffect(() => {
        if (dataCompany?.code === 0) {
            setModalVisible(false)
            setEdit('')
            dispatch(getCompany({restaurantId: iD, page: pagination - 1}))
        }
        localStorage.setItem('Line-Active', '9')
        dispatch(getCompany({restaurantId: iD, page: pagination - 1}))
    }, [dataCompany, pagination])

    function onFinish(values) {
        if (edit) dispatch(updateCompany({...values, restaurantId: iD, id}))
        else dispatch(addCompany({...values, restaurantId: iD}))
    }

    function toggle() {
        setModalVisible(prev => !prev)
        setEdit('')
    }

    function editItem(item) {
        setEdit(item)
        setModalVisible(true)
    }

    const phoneCode = (<Form.Item initialValue={'+998'} name="code" noStyle><Input disabled/></Form.Item>)

    const modalForm = <>
        <Form onFinish={onFinish}>
            <Form.Item label={Name[language]} name={'name'} initialValue={name}>
                <Input required/>
            </Form.Item>
            <Form.Item label={Address[language]} name={'address'} initialValue={address}>
                <Input required/>
            </Form.Item>
            <Form.Item label={Phone[language]} name={'phone'} initialValue={phone}>
                <Input addonBefore={phoneCode} maxLength={9} required/>
            </Form.Item>
            <Form.Item>
                <Button loading={loading} className="modal-buttons" htmlType={'submit'}>
                    {edit ? updateProfile[language] : add[language]}
                </Button>
                <Button htmlType={'button'} className="modal-buttons" onClick={toggle}>
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

                {isLoading ? <MyLoader/> : company.length > 0 ? <table className={'table'}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>{Name[language]}</th>
                        <th>{Address[language]}</th>
                        <th>{Phone[language]}</th>
                        <th className="table-th"/>
                    </tr>
                    </thead>
                    <tbody>
                    {company.map((item, index) => isLoading ? <MyLoader/> : <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{'+998' + item.phone}</td>
                        <td className={'table-tools'}>
                            <div className="card-footer">
                                <div className="table-buttons" onClick={() => editItem(item)}><EditOutlined/></div>
                                <Popconfirm
                                    title={Warning[language]}
                                    onConfirm={() => dispatch(deleteCompany(item.id))}
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
            </div>
            <div className={'pagination'}>
                {company.length > 0 && <Pagination onChange={(e) => setPagination(e)} defaultCurrent={pagination}
                            total={pageCount * 10} responsive={true} showQuickJumper={true}/>}
            </div>

        </>
    )
}

export default Company
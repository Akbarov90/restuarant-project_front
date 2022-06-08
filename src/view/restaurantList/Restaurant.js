import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {addRestaurant, deleteRestaurant, getRestaurantList, updateRestaurant} from "../../store/restaurants/restaurants";
import {Button, Form, Input, Popconfirm, Pagination} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons'
import Modal from '../../component/modal/Modal'
import Notification from "../../component/notification/Notification";
import MyLoader from "../loading/MyLoader";
import {Language} from "../../component/language/Language"
import '../restaurantList/list.css'

function Restaurant() {

    const history = useHistory()
    const dispatch = useDispatch()
    const {resData, isLoading, data, loading, pageCount} = useSelector(state => state.restaurants)
    const {language, roleSupperAdmin} = useSelector(state => state.auth)
    const [modalVisible, setModalVisible] = useState(false)
    const [edit, setEdit] = useState('');
    const [pagination, setPagination] = useState(1)
    const [search, setSearch] = useState('');
    const {name, address, phone, id} = edit;

    const {add, Name, Address, Phone, Warning, cancelBtn, NoData, updateProfile, Ok, No} = Language;

    useEffect(() => {
        if (data.code === 0) {
            setModalVisible(false)
            setEdit('')
            dispatch(getRestaurantList({page: pagination - 1}))
        }
        localStorage.setItem('Line-Active', '1')
        dispatch(getRestaurantList({page: pagination - 1}))
    }, [data])

    function toggle() {
        setEdit('');
        setModalVisible(prev => !prev)
    }

    function editItem(item) {
        setEdit(item);
        setModalVisible(true)
    }

    function onFinish(values) {
        if (edit) dispatch(updateRestaurant({...values, id}))
        else dispatch(addRestaurant(values))
    }

    const modalForm =
        <>
            <Form onFinish={onFinish}>
                <Form.Item label={Name[language]} name={'name'} initialValue={name}>
                    <Input required/>
                </Form.Item>
                <Form.Item label={Address[language]} name={'address'} initialValue={address}>
                    <Input required/>
                </Form.Item>
                <Form.Item label={Phone[language]} name={'phone'} initialValue={phone}>
                    <Input required/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType={'button'} className="modal-buttons" onClick={toggle}>
                        {cancelBtn[language]}
                    </Button>
                    <Button loading={loading} className="modal-buttons" htmlType={'submit'}>
                        {edit ? updateProfile[language] : add[language]}
                    </Button>
                </Form.Item>
            </Form>
        </>

    return (
        <div className="container-list">
            <Notification/>
            <div className="rows">
                <input className={'search-button'} placeholder={'Search'} value={search}
                       onChange={(e) => setSearch(e.target.value)} type="search"/>
                <button className={'modal-btn'} onClick={toggle}>{add[language]}</button>
            </div>

            {modalVisible && <Modal modalVisible={modalVisible} modalForm={modalForm} toggle={toggle}
                                    setModalVisible={setModalVisible} edit={edit}/>}

            {isLoading ? <MyLoader/> : <div id="table">
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>{Name[language]}</th>
                        <th>{Address[language]}</th>
                        <th>{Phone[language]}</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {resData.length > 0 ? resData.filter(item => {
                        if (item === '') return item;
                        else if (item.name.toUpperCase().includes(search.toUpperCase())) return item;
                        else if (item.address.toUpperCase().includes(search.toUpperCase())) return item;
                        else if (item.phone.toUpperCase().includes(search.toUpperCase())) return item;
                    }).map((item, index) =>
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td className="table-tools">
                                <div className="table-buttons" onClick={() => editItem(item)}><EditOutlined/></div>
                                <Popconfirm
                                    title={Warning[language]}
                                    onConfirm={() => dispatch(deleteRestaurant(item.id))}
                                    onCancel okText={Ok[language]} cancelText={No[language]}>
                                    <div className="table-buttons"><DeleteOutlined/></div>
                                </Popconfirm>
                                <div className={'table-buttons'}
                                     onClick={() => history.push('/' + item.id + '/category', item.id)}>
                                    <EyeOutlined/>
                                </div>
                            </td>
                        </tr>) : <tr>
                        <td className={"table-data"} colSpan={5}>{NoData[language]}</td>
                    </tr>}
                    </tbody>
                </table>
            </div>}
            <div className={'pagination'}>
                {resData.length > 0 && <Pagination onChange={(e) => setPagination(e)} defaultCurrent={pagination}
                                                   total={pageCount} responsive={true}
                                                   showQuickJumper={true}/>}
            </div>
        </div>
    );
}

export default Restaurant
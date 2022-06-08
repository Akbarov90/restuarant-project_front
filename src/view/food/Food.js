import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getFood, addFood, updateFood, deleteFood} from "../../store/food/food";
import Modal from '../../component/modal/Modal';
import {Language} from '../../component/language/Language';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, Form, Input, Pagination, Popconfirm, Select} from "antd";
import MyLoader from "../loading/MyLoader";
import {getFoodCategory} from "../../store/category/foodCategory/foodCategory";


function Food({match}) {

    const iD = match.params.id
    const dispatch = useDispatch()
    const {isLoading, food, dataFood, pageCount, loading} = useSelector(state => state.food)
    const {language} = useSelector(state => state.auth)
    const {foodCategory} = useSelector(state => state.foodCategory)
    const [modalVisible, setModalVisible] = useState(false)
    const [pagination, setPagination] = useState(1)
    const [edit, setEdit] = useState('')

    const {name, price, food_category_id} = edit;
    const {
        add,
        Name,
        NoData,
        Warning,
        Ok,
        No,
        cancelBtn,
        Price,
        Phone,
        updateProfile,
        FoodCategories,
        Address,
        Category,
        Selectt
    } = Language

    useEffect(() => {
        console.log(dataFood)
        if (dataFood.code === 0) {
            setModalVisible(false)
            setEdit('')
            dispatch(getFood({restaurantId: iD, page: pagination - 1}))
        }
        localStorage.setItem('Line-Active', '10')
        dispatch(getFood({restaurantId: iD, page: pagination - 1}))
    }, [dataFood, pagination])

    useEffect(() => {
        dispatch(getFoodCategory({restaurantId: iD, page: pagination - 1}))
    }, [])


    function onFinish(values) {
        if (edit) {
            dispatch(updateFood({...values, id: edit.id, iD: iD}))
        } else dispatch(addFood({...values, restaurantId: iD}))
    }

    function toggle() {
        setModalVisible(prev => !prev)
        setEdit('')
    }

    function editFood(item) {
        setEdit(item)
        setModalVisible(true)
    }

    const modalForm = <>
        <Form onFinish={onFinish}>
            <Form.Item label={Name[language]} name={'name'} initialValue={name}>
                <Input required/>
            </Form.Item>
            <Form.Item label={Price[language]} name={'price'} initialValue={price}>
                <Input type={"number"} required/>
            </Form.Item>
            <Form.Item name={'foodCategoryId'} initialValue={food_category_id} label={Category[language]} required>
                <Select className={"select-button"} placeholder={Selectt[language]}>
                    {foodCategory.map((item) => <Select.Option value={item.id}
                              key={item.id}>{item.name}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button loading={loading} className={'modal-buttons'} htmlType={'submit'}>
                    {edit ? updateProfile[language] : add[language]}
                </Button>
                <Button htmlType={'button'} className={'modal-buttons'} onClick={toggle}>
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

                {isLoading ? <MyLoader/> : food.length > 0 ?
                    <table className={'table'}>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>{Name[language]}</th>
                            <th>{Price[language]}</th>
                            <th>{FoodCategories[language]}</th>
                            <th>{Phone[language]}</th>
                            <th>{Address[language]}</th>
                            <th className={'table-th'}/>
                        </tr>
                        </thead>
                        <tbody>
                        {food.map((item, i) => isLoading ? <MyLoader/> :
                            <tr key={i + 1}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.food_category_name}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td className='table-tools'>
                                    <div className='card-footer'>
                                        <div className='table-buttons' onClick={() => editFood(item)}><EditOutlined/>
                                        </div>
                                        <Popconfirm
                                            title={Warning[language]}
                                            onConfirm={() => dispatch(deleteFood(item.id))}
                                            onText={Ok[language]} cancelText={No[language]}>
                                            <div className={'table-buttons'}>
                                                <DeleteOutlined/>
                                            </div>
                                        </Popconfirm>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table> : <div className={'no-data'}><h2>{NoData[language]}</h2></div>
                }
                <div className={'pagination'}>
                    {food.length > 0 && <Pagination onChange={(e) => setPagination(e)} defaultCurrent={pagination}
                                                    total={Math.ceil(pageCount / 20) * 10} responsive={true}
                                                    showQuickJumper={true}/>}
                </div>
            </div>
        </>
    )
}

export default Food;
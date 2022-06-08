import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Popconfirm, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../component/modal/Modal'
import {
    addContract,
    deleteContract,
    getContract,
    updateContract,
} from '../../store/contract/contract'
import MyLoader from '../loading/MyLoader'
import { Language } from './../../component/language/Language'

const Contract = ({ match }) => {
    const id = match.params.id
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [change, setChange] = useState(false)
    const [form, setForm] = useState('')
    const [contractId, setContractId] = useState(0)
    const {
        firmname,
        contractnum,
        contractsum,
        Summa,
        add,
        Warning,
        Ok,
        No,
        updateProfile,
        cancelBtn,
        NoData,
    } = Language

    const { loading, contract, data } = useSelector(state => state.contract)
    const { language } = useSelector(state => state.auth)

    useEffect(() => {
        if (data.code === 0) {
            setForm('')
            setModal(false)
            dispatch(getContract({ firmaId: id }))
        }
        dispatch(getContract({ firmaId: id }))
    }, [dispatch, id, data])

    const onFinish = value => {
        if (change) {
            dispatch(
                updateContract({
                    urlId: Number(id),
                    id: Number(contractId),
                    firmaId: Number(value.firma_id),
                    contractNum: Number(value.contract_num),
                    contractSum: Number(value.contract_sum),
                })
            )
        } else {
            dispatch(
                addContract({
                    firmaId: parseInt(value.firma_id),
                    contractNum: Number(value.contract_num),
                    contractSum: Number(value.contract_sum),
                })
            )
        }
    }

    const addChange = () => {
        setChange(false)
        setModal(!modal)
    }

    const editChange = contract => {
        setContractId(contract.id)
        setChange(true)
        setModal(!modal)
        setForm(contract)
    }

    const toggle = () => {
        setModal(!modal)
        setForm('')
    }

    const modalForm = (
        <>
            <Form onFinish={onFinish}>
                <Form.Item name='firma_id' label={firmname[language]} initialValue={form.firma_id}>
                    <Select placeholder='select your firm'>
                        {contract.map((item, index) => (
                            <Select.Option value={item.firma_id} key={index}>
                                {item.firma_name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={contractnum[language]}
                    name={'contract_num'}
                    initialValue={form.contract_num}
                >
                    <Input required type='number' />
                </Form.Item>
                <Form.Item
                    label={contractsum[language]}
                    name={'contract_sum'}
                    initialValue={form.contract_sum}
                >
                    <Input required type='number' />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} className='modal-buttons' htmlType={'submit'}>
                        {change ? updateProfile[language] : add[language]}
                    </Button>
                    <Button className='modal-buttons' htmlType={'button'} onClick={toggle}>
                        {cancelBtn[language]}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

    return (
        <div className='container'>
            <div>
                <button className={'modal-btn'} onClick={addChange}>
                    {add[language]}
                </button>
            </div>
            {modal && (
                <Modal
                    modalVisible={modal}
                    setModalVisible={setModal}
                    toggle={toggle}
                    modalForm={modalForm}
                    edit={form}
                />
            )}
            {loading ? (
                <MyLoader />
            ) : contract.length > 0 ? (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>{firmname[language]}</th>
                            <th>{contractnum[language]}</th>
                            <th>{contractsum[language]}</th>
                            <th>{Summa[language]}</th>
                            <th className='table-th' />
                        </tr>
                    </thead>
                    <tbody>
                        {contract.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.firma_name}</td>
                                <td>{item.contract_num}</td>
                                <td>{item.contract_sum}</td>
                                <td>{item.summa}</td>
                                <td className='table-tools'>
                                    <div className='card-footer'>
                                        <div
                                            className='table-buttons'
                                            onClick={() => editChange(item)}
                                        >
                                            <EditOutlined />
                                        </div>
                                        <Popconfirm
                                            title={Warning[language]}
                                            okText={Ok[language]}
                                            cancelText={No[language]}
                                            onConfirm={() => {
                                                dispatch(deleteContract(item.id))
                                            }}
                                        >
                                            <div className='table-buttons'>
                                                <DeleteOutlined />
                                            </div>
                                        </Popconfirm>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className={'no-data'}>
                    <h2>{NoData[language]}</h2>
                </div>
            )}
        </div>
    )
}

export default Contract

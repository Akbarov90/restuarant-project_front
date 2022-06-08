import {useSelector} from "react-redux";
import './modal.css'
import React from "react";
import {Language} from "../language/Language";

function Modal({modalVisible, setModalVisible, edit, modalForm, toggle}) {

    const {language} = useSelector(state => state.auth)
    const {add, updateProfile} = Language

    return (
        <div className={modalVisible ? 'modal active' : 'modal'} onClick={()=>setModalVisible(false)}>
            <div className={modalVisible ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                <div className={'modal-header'}>
                    <h2>{edit ? updateProfile[language] : add[language]}</h2>
                    <span className={'span-x'} onClick={toggle}>&times;</span>
                </div>
                <div className={'modal-form'}>
                    {modalForm}
                </div>
            </div>
        </div>
    )
}

export default Modal
import { Link } from 'react-router-dom'
import React from 'react'
import MenuOutlined from '@ant-design/icons/es/icons/MenuOutlined'
import { useSelector } from 'react-redux'
import { Dropdown, Menu, Select } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './navbar.css'
import uzb from '../../image/uzb.png'
import eng from '../../image/eng.png'
import rus from '../../image/rus.png'
import ArrowLeftOutlined from '@ant-design/icons/es/icons/ArrowLeftOutlined'

function Navbar({ setSidebar, updateLanguage, language }) {
    const { oneUser } = useSelector(state => state.auth)

    const menu = (
        <Menu className='dropdown-menu-page'>
            <Menu.Item key='0'>
                <Link to={'/profile-page'}>
                    {language === '0' ? "O'zgartirish" : language === '1' ? 'Изменит' : 'Update'}
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='1'>
                <Link to={'/login'}>Log out</Link>
            </Menu.Item>
        </Menu>
    )

    function handleChange(value) {
        updateLanguage(value)
    }

    return (
        <>
            <div className='navigation'>
                <nav className='navbar'>
                    <div className='row'>
                        <div className='navigations'>
                            <MenuOutlined
                                style={{ color: 'white', fontSize: 22 }}
                                onClick={() => setSidebar(true)}
                            />
                            <ArrowLeftOutlined
                                style={{ color: 'white', fontSize: 22, marginLeft: 10 }}
                                onClick={() => window.history.back()}
                            />
                        </div>

                        <div className={'navbar-user-fullName'}>
                            <Select
                                style={{}}
                                suffixIcon={false}
                                defaultValue={language}
                                onChange={handleChange}
                            >
                                <Select.Option value={'0'}>
                                    <img className='flagLogo' src={uzb} alt='UZ' />
                                </Select.Option>
                                <Select.Option value={'1'}>
                                    <img className='flagLogo' src={rus} alt='RU' />
                                </Select.Option>
                                <Select.Option value={'2'}>
                                    <img className='flagLogo' src={eng} alt='EN' />
                                </Select.Option>
                            </Select>
                            <h2 className={'uppercase navbar-name'}>
                                {oneUser?.firstName + ' ' + oneUser?.lastName}
                            </h2>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <div
                                    className='ant-dropdown-link navbar-user-icon'
                                    onClick={e => e.preventDefault()}
                                >
                                    <UserOutlined />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar

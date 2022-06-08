import {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Language} from "../language/Language";
import {UserOutlined} from "@ant-design/icons";
import {Dropdown, Menu, Select} from "antd";
import MenuOutlined from "@ant-design/icons/es/icons/MenuOutlined";
import {Base64} from "js-base64";
import uzb from "../../image/uzb.png"
import eng from "../../image/eng.png"
import rus from "../../image/rus.png"
import './sidebar.css'

function Sidebar({updateLanguage, setSidebar, open, language, children, product}) {

    const [user, setUser] = useState(JSON.parse(Base64.decode(localStorage.getItem('Authority'))).data)
    const {userInfo} = useSelector(state => state.auth)

    const {updateProfile} = Language

    const menu = (
        <Menu className="dropdown-menu-page">
            <Menu.Item key="0">
                <Link
                    to={'/profile-page'}>{updateProfile[language]}</Link>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="1">
                <Link to={'/login'}>Log out</Link>
            </Menu.Item>
        </Menu>
    );

    function handleChange(value) {
        updateLanguage(value)
    }

    return (
        <div>
            <div className="navigation">
                <nav className="navbar">
                    <div className="row">
                        <div className="navigations">
                            <MenuOutlined className="scale-icon"
                                          style={{color: "white", marginRight: 5}}
                                          onClick={() => setSidebar(true)}/>
                        </div>
                        <div className={'navbar-user-fullName'}>
                            <Select suffixIcon={false} defaultValue={user.language}
                                    onChange={handleChange} className="navigations">
                                <Select.Option value={0}><img className="flagLogo" src={uzb} alt="UZ"/></Select.Option>
                                <Select.Option value={1}><img className="flagLogo" src={rus} alt="RU"/></Select.Option>
                                <Select.Option value={2}><img className="flagLogo" src={eng} alt="EN"/></Select.Option>
                            </Select>
                            <h2 className={'uppercase navbar-name'}>{userInfo?.firstName + ' ' + userInfo?.lastName}</h2>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <div className="navbar-user-icon"><UserOutlined className="userIcon"/></div>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </nav>
            </div>
            <div className={open ? 'sidebar active flex ' : 'sidebar'} onClick={() => setSidebar(false)}>
                <div className={'sidebar-content'}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
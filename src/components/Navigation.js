import React, {useState} from "react";
import {Menu} from "antd";
import {ContactsOutlined, UserOutlined,} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

const role = JSON.parse(localStorage.getItem('user'))?.role

const Navigation = () => {
    const history = useHistory();

    const {SubMenu} = Menu;
    const [current, setCurrent] = useState("mail");

    const handleClick = e => {
        setCurrent(e.key);
    };

    const handleLogOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('doctorId')
        history.push("/")
    }

    const renderAdminNav = () => {
        let user = JSON.parse(localStorage.getItem('user')).role
        if (role === "ADMINISTRATOR") {
            return (
                <>
                    <Menu.Item
                        key='doctors'
                        onClick={() => history.push("/doctors")}
                        icon={<ContactsOutlined/>}
                    >
                        All Doctors
                    </Menu.Item>
                    <SubMenu
                        key='SubMenu'
                        icon={<UserOutlined/>}
                        title={user} //username iz baze
                    >
                        <Menu.Item key='setting:1' onClick={() => handleLogOut()}>Log Out</Menu.Item>
                    </SubMenu>
                </>
            )
        } else if(role === "PATIENT"){
            return (
                <>
                    <Menu.Item
                        key='patient'
                        onClick={() => history.push(`/patient/${JSON.parse(localStorage.getItem('user')).userId}`)}
                        icon={<ContactsOutlined/>}
                    >
                        Personal Data
                    </Menu.Item>
                    <SubMenu
                        key='SubMenu'
                        icon={<UserOutlined/>}
                        title={user} //username iz baze
                    >
                        <Menu.Item key='setting:1' onClick={() => handleLogOut()}>Log Out</Menu.Item>
                    </SubMenu>
                </>
            )
        }else if(role === "DOCTOR"){
            return(
            <>
                <Menu.Item
                    key='allPatients'
                    onClick={() => history.push(`/doctor/${JSON.parse(localStorage.getItem('user')).userId}`)}
                    icon={<ContactsOutlined/>}
                >
                    All Patients
                </Menu.Item>
                <SubMenu
                    key='SubMenu'
                    icon={<UserOutlined/>}
                    title={user} //username iz baze
                >
                    <Menu.Item key='setting:1' onClick={() => handleLogOut()}>Log Out</Menu.Item>
                </SubMenu>
            </>
            )
        }
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
            {renderAdminNav()}
        </Menu>
    );
};

export default Navigation;

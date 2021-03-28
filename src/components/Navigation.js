import React, { useState } from "react";
import { Menu } from "antd";
import {
    MedicineBoxOutlined,
    UserOutlined,
    ContactsOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";

const Navigation = () => {
    const history = useHistory();

    const { SubMenu } = Menu;
    const [current, setCurrent] = useState("mail");

    const handleClick = e => {
        setCurrent(e.key);
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
            <Menu.Item
                key='mail'
                onClick={() => history.push("/")}
                icon={<ContactsOutlined />}
            >
                Personal Data
            </Menu.Item>
            <Menu.Item
                key='app'
                onClick={() => history.push("/doctors")}
                icon={<MedicineBoxOutlined />}
            >
                Your Doctor
            </Menu.Item>
            <SubMenu
                // style={{ marginLeft: "200px" }}
                key='SubMenu'
                icon={<UserOutlined />}
                title='User' //username iz baze
            >
                {/* <Menu.ItemGroup title='Item 1'> */}
                <Menu.Item key='setting:1'>Log Out</Menu.Item>
                {/* </Menu.ItemGroup> */}
            </SubMenu>
        </Menu>
    );
};

export default Navigation;

import React from 'react'
import { Row, Col, Image, Button } from 'antd';
import 'antd/dist/antd.css';
import './Header.css';
import logo from  "../../assets/logo/enepath.png"
import { useHistory } from 'react-router';
// Redux;
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/actions/userActions'

const Header = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logoutUser(history))
    }

    return (
        <div className="main-header">
            <Row justify="center" className="title">
                <Col span={6}>
                    <Image width={25} src={logo} />
                    User ID: {props.UserId}
                </Col>
                <Col span={12}>{props.DisplayName}</Col>
                <Col span={6}>
                    <Button type="primary" size="large" onClick={logOut}>
                        Logout
                    </Button>
                </Col>
            </Row>

            <Row justify="center" className="subtitle"> UIN:</Row>
            <Row justify="center" className="subtitle"> Line Name:</Row>
            <Row justify="center" className="subtitle"> Duration:</Row>
        </div>
    )
}

export default Header
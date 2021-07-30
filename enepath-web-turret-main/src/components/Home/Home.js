import React, { useState, useEffect } from 'react';

// import Login from './components/LoginPage/LoginPage'
import "./Home.css";

import Header from "../../components/Header/Header"
import UserControls from '../../components/UserControls/UserControls'
import DialedNumberDisplay from '../../components/DialedNumberDisplay/DialedNumberDisplay'
import CallControls from '../../components/CallControls/CallControls'
import SpeedDials from '../../components/SpeedDials/SpeedDials'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Home(props) {

	const [DisplayName, setDisplayName] = useState("")
	const [UserId, setUserId] = useState("00000")
	const [DialButtons, setDialButtons] = useState([])
	const [dial, setDial] = useState(0)
    const userState = useSelector(state => state.user)
          let isMounted = true;               // note mutable flag

    useEffect(() => {

        if (userState.authenticated === false) {
            props.history.push('/')
        }
          return () => { isMounted = false }; // use cleanup to toggle value, if unmounted

    }, [userState, isMounted]);
        
    useEffect(() => {

        document.body.classList.add('home-page');
        document.body.classList.remove('login-page');
        
        axios.get('http://localhost:4000/web-text')
        .then(res => res.data.data)
        .then(text => {
            text = text.split('\n')
            text.push("END")
            let dialButtons = []

            text.forEach(element => {
                let curr = element.split(":")
                if ("DN" === curr[0]) {
                    setDisplayName(curr[1])
                    setUserId(curr[2])
                }
                else if ("BU" === curr[0]) {
                    dialButtons.push(curr)
                }
                else if ("END" === curr[0]) {
                    setDialButtons(dialButtons)
                }
            })
        })
        .catch(err => {
            console.log(err)
        });
    }, [])
    

    const changeHandler = (e) => {
        setDial(e.target.value)
    }
	
    return (
      <div className="parent-container">
          <Header DisplayName={DisplayName} UserId={UserId} />
          <UserControls />
          <DialedNumberDisplay changeHandler={changeHandler} dialValue={dial} />
          <CallControls dialPad={dial} />
          <SpeedDials dialButtons={DialButtons} />
      </div>
    );
}

export default Home;


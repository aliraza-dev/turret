import React, { useState, useEffect } from 'react';

// import Login from './components/LoginPage/LoginPage'

import Header from "../../components/Header/Header"
import UserControls from '../../components/UserControls/UserControls'
import DialedNumberDisplay from '../../components/DialedNumberDisplay/DialedNumberDisplay'
import CallControls from '../../components/CallControls/CallControls'
import SpeedDials from '../../components/SpeedDials/SpeedDials'

import raw from '../../assets/web-page.txt';

function Home() {
	const [DisplayName, setDisplayName] = useState("")
	const [UserId, setUserId] = useState("00000")
	const [DialButtons, setDialButtons] = useState([])
	const [dial, setDial] = useState(0)


    useEffect(() => {
      fetch(raw).then(res => res.text())
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


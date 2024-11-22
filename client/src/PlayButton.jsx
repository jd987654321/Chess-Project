import { useState } from 'react'
import './PlayButton.css'
import Clipboard from './assets/Clipboard.svg'
import { v4 } from 'uuid'

export default function PlayButton(props){
    let [clicked, setClicked] = useState(false)


    return(
        //p, div, p will all only be rendered if clicked
        <div style={{
            width: clicked ? "400px" : "100px",
            height: clicked ? "250px" : "50px"
        }} onClick={() => {
            if(!clicked){
                setClicked(true)
            }
            console.log("div")
            console.log(clicked)
        }} className="button-container">
            { !clicked ? (
                
                    <div style={{
                        opacity: clicked ? 0 : 1
                    }} className="wrapper">
                        <p>Play</p>
                    </div>
                
                ) : (
                
                    <div style={{
                        opacity: clicked ? 1 : 0
                    }} className="wrapper">
                    <p className="join-msg">The game will start when another <br/>player joins with this link!</p>
                    <div className="link-div">
                    <input className="link" value={"http://localhost:5500/" + v4()}></input>
                    <img src={Clipboard}/>
                    </div>
                    <p onClick={() => {setClicked(false)}} className="cancel-msg">Cancel match</p>
                    </div>
                )
            }
        </div>
    )
}


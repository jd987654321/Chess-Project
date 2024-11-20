import { useState } from 'react'
import './PlayButton.css'
import Clipboard from './assets/Clipboard.svg'
import { v4 } from 'uuid'

export default function PlayButton(){
    let [clicked, setClicked] = useState(false)

    return(
        //p, div, p will all only be rendered if clicked
        <div onClick={() => {
            if(!clicked){
                setClicked(true)
            }
            console.log("div")
            console.log(clicked)
        }} className="button-container">
            { !clicked ? (
                <>
                    <p>Play</p>
                </>
                ) : (
                <>
                    <p className="join-msg">The game will start when another player joins with this link!</p>
                    <div className="link-div">
                    <input className="link" value={"http://localhost:5500/" + v4()}></input>
                    <img src={Clipboard}/>
                    </div>
                    <p onClick={() => {setClicked(false)}} className="cancel-msg">Cancel match</p>
                </>)
            }
        </div>
    )
}
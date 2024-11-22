import { useState } from 'react'
import './PlayButton.css'
import Clipboard from './assets/Clipboard.svg'
import { v4 } from 'uuid'

export default function JoinButton(props){
    let [clicked, setClicked] = useState(false)
    let [inputText, setInputText] = useState("")

    //let {startConnection} = props

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
                        <p>Join Game</p>
                    </div>
                
                ) : (
                
                    <div style={{
                        opacity: clicked ? 1 : 0
                    }} className="wrapper">
                    <div className="link-div">
                    <input text={inputText} onChange={(event) => {
                        setInputText(event.target.value)
                        }} className="link" ></input>
                    </div>
                    <p /*onClick={() => {startConnection(inputText)}}*/ className="find-match-msg">Find match</p>
                    <p onClick={() => {setClicked(false)}} className="cancel-msg">Cancel match</p>
                    </div>
                )
            }
        </div>
    )
}


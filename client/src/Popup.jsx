import { useState, useEffect } from 'react'
import './Popup.css'

export default function Popup(props){
    let { setOptions, options, setResult, message} = props
    
    const appear = {
        transform: "translateX(0%)"
    }

    const disappear = {
        transform: "translateX(100%)"
    }

    let [buttonState, setButtonState] = useState(appear)
    // useEffect(() => {
    //     options = [...options, 'x']
    //     console.log(options)
    // }, [])
    
    //hook var for returning answer
    //hook var for options
    //we want the component to take an array of options
    
    //component should prop up when a certain prop is changed
    //so this will only render due to some event asking for input


    return (
        <div style={buttonState} className='pop-up-container'>
            <p>{message}</p>
            <div className='options-container'>
                {[...options, 'x'].map((option, index) => {
                    return(
                    <div key={index}
                    className='option-div'
                    onClick={() => {
                        setButtonState(disappear)
                    }}>
                        {option}
                    </div>)
                })}
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import './Popup.css'

export default function Popup(props){
    let { options, setResult, message} = props
    
    // useEffect(() => {
    //     if("x" in options){
    //         return
    //     }
    //     options.push("x")
    //     console.log(options)
    // }, [])
    
    //hook var for returning answer
    //hook var for options
    //we want the component to take an array of options
    
    //component should prop up when a certain prop is changed
    //so this will only render due to some event asking for input
    
    const style = {
        animation: 
        `slide-in 2s linear,
        slide-out 2s linear`,
        animationDelay: `0s, 5s`
    }

    return (
        <div style={style} className='pop-up-container'>
            <p>{message}</p>
            <div className='options-container'>
                {options.map((option, index) => {
                    return(
                    <div key={index}
                    className='option-div'
                    onClick={() => {
                        console.log(option)
                    }}>
                        {option}
                    </div>)
                })}
            </div>
        </div>
    )
}
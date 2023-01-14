import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { isPropertySignature } from "typescript";

export const Handler = (props: HandlerProps) => {
    const [angle, setAngle] = useState(0)
    const [isMoving, setIsMoving] = useState(false);
    const [angleInMove, setAngleInMove] = useState(0)

    const handlerElement = useRef<HTMLDivElement>(null);
    const pointerElement = useRef<HTMLDivElement>(null);


    useEffect(() => {
        handlerElement.current!.addEventListener("wheel", handleWheelEvent, {passive: false})

        handlerElement.current!.addEventListener("mousedown", handleMouseDown)
        handlerElement.current!.addEventListener("mouseup", handleMouseUp)

        //setInterval(() => s("current"), 500);
        //selectHandler().addEventListener("mouseout", (e) => setIsMoving(false))
        //selectHandler().addEventListener("mousemove",(e) => {handleMouseDownEvent(e); e.stopPropagation()})
    },)

    const s = (text: string = "Wow") => {
        console.log({
            angle: angle,
            isMoving: isMoving,
            text: text
        })
    }


    const handleWheelEvent = (e: WheelEvent) => {
        setAngle(angle + e.deltaY)
        changeAngle(angle)
        e.preventDefault()
        e.stopPropagation()
        props.angleValueCallback(countValue())
    }

    const handleMouseDown = (e: MouseEvent) => {
        console.log("down " + e.clientX)
    }

    const handleMouseUp = (e: MouseEvent) => {
        console.log("up")
    }

    const handleMouseDownEvent = (e: MouseEvent) => {

        if(isMoving == true) {

            let coordonateInfo = handlerElement.current!.getBoundingClientRect();
            let center = {
                x: (coordonateInfo.width/ 2) + coordonateInfo.x,
                y: (coordonateInfo.height / 2) + coordonateInfo.y  
            }

            let sin = (e.y - center.y) / Math.sqrt((Math.pow(e.x - center.x, 2) + Math.pow(e.y - center.y, 2)))

            let deltaAngle = Math.asin(sin) * 180 / Math.PI;

            setAngle(angleInMove + deltaAngle)
            changeAngle(angle)

            console.log({
                isMoving: isMoving,
                angle: angle,
                deltaAngle: deltaAngle,
                angleInMove: angleInMove
            })
        }        
    }

    return(
        <div className="handler" ref={handlerElement}>
            <div className={`marker ${props.class}`} ref={pointerElement}></div>
        </div>
    )

    function changeAngle(angle: number) {
        pointerElement.current!.style.setProperty(`--${props.class}-angle`,`${angle}deg`)
    }

    function countValue() {
        if (angle < 0) {
            return Math.round((255/360) * (360 - Math.abs(angle % 360)))
        }        

            return Math.round((255/360) * ((angle % 360)))
    }
}

interface HandlerProps {
    class: string;
    angleValueCallback: Dispatch<SetStateAction<number>>
}
import FlexboxReact from "flexbox-react";
import { useState } from "react"
import { Handler } from "../handler/handler"

export const Panel = () => {

    const [red, setRed] = useState(0);
    const [green, setGreen] = useState(0);
    const [blue, setBlue] = useState(0);

    return (
        <>
        <FlexboxReact flexDirection="column">
            <FlexboxReact alignItems="center" justifyContent="center" padding="auto" width="max">
                <Handler class={"red"} angleValueCallback={setRed}></Handler>
                {/* <Handler class={"green"} angleValueCallback={setGreen}></Handler>
                <Handler class={"blue"} angleValueCallback={setBlue}></Handler>             */}
            </FlexboxReact>

            <FlexboxReact alignItems="center" justifyContent="center">
                <FlexboxReact flexDirection="column">
                    <p>{`rgb(${red},${green},${blue})`}</p>
                    <div className="color" style={ {backgroundColor: `rgb(${red},${green},${blue})`} }/>                
                </FlexboxReact>                
            </FlexboxReact>
        </FlexboxReact>


        </>
    )
}
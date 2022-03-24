import React from "react";

export class Track extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {button: '+'}
    }


    renderAction()
    {
        let output = this.props.isRemoval ? '-' : '+';
        this.setState({button: output});
    }

    render()
    {
        return (
            <div className="Track">
                <div className="Track-information">
                    {/* <h3><!-- track name will go here --></h3> */}
                    {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
                </div>
                <button className="Track-action">{this.state.button}</button>
            </div>
        )
    }
}
import React from "react";
import Track from '../Track/Track';


export class TrackList extends React.Component 
{
    render()
    {
        return (
            <div className="TrackList">
                <Track isRemoval={true} />{/* <!-- You will add a map method that renders a set of Track components  --> */}
            </div>
        )
    }
}
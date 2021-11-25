import Clock from './clock';
import Tab from './tabs';
import React from 'react'

const Root = () => {
    return (
        <div>
            <Clock />
            <Tab tabs={array}/>
        </div>
    )
}

let array = [ { title: "WiDjIfY", content: "Widgets! they are cool. nice."}, { title: "a poem", content:"A shining crescent far beneath the flying vessel. She stared through the window at the stars."}, { title: "The third one", content: "A red flare silhouetted the jagged edge of a wing. "} ]

export default Root;
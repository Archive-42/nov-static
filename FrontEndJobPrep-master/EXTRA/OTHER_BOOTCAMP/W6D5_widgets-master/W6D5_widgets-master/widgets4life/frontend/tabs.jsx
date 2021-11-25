import React from 'react'

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {index: 0} ;
    }

    render() {
        return (
            <div>
                <ul className="tabs">  
                {this.props.tabs.map((tab, index) => {
                    return <h1>{tab.title}</h1>
                    tab.on("click" , (e) =>{
                        this.state.index = index;



                    }
                    )
                })}               
                </ul>
                <article>
                    {this.props.tabs[this.state.index].content}
                </article>
            </div>
        );
    }
}

export default Tab;
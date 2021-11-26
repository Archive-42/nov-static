import React from 'react';

import Card from './Card';

const Store = (props) => {
    return (<>
        <h2>Store</h2>
        <div className="columns">
            {props.cards.map(card => (
                <div key={card.id} className="column is-one-sixth">
                    <button className="button"><small>Buy ({props.inventory[card.id]})</small></button>
                    <Card {...card} />
                </div>
            ))}
        </div>
    </>);
}

export default Store;


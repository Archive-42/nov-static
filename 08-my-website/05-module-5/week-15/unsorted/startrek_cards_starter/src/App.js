import React from 'react';
import { Switch, NavLink, BrowserRouter, Route } from 'react-router-dom';

import DeckWithContext from './DeckWithContext';
import StoreWithContext from './StoreWithContext';


function App(props) {
  return (
    <>
      <h1 className="title is-1">Star Trek Trading Card Store!</h1>
      <p>Here you can buy and sell cards in order to build your ultimate deck!</p>
      <BrowserRouter>
        <div className="navbar">
          <div className="navbar-menu">
            <NavLink to='/store' className="navbar-item" activeClassName="is-selected">Store</NavLink>
            {props.decks.map((deck) => 
                <NavLink to={`/decks/${deck.id}`} className="navbar-item" activeClassName="is-selected" key={deck.id} >
                    {deck.name}
                </NavLink>)}
          </div>
        </div>
        <Switch>
            <Route path="/decks/:id" render={(props) => <DeckWithContext deckId={props.match.params.id}/>} />
            <Route exact path="/store" component={StoreWithContext} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

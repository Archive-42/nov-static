import React, { useState } from "react";

import { useFriendStatus } from "./hook-def.js";

class CountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You Clicked {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          click me
        </button>
      </div>
    );
  }
}

function HookComponent() {
  // return [S, Dispatch<SetStateAction<S>>]
  const [count, setCount] = useState(1);

  const isOnline = useFriendStatus();

  return (
    <div>
      <p>You Clicked {count}</p>
      <button onClick={() => setCount(1)}>reset</button>
      <button onClick={() => setCount(count + 1)}>hook +</button>
      <button onClick={() => setCount(count - 1)}>hook -</button>
      <p>{isOnline}</p>
    </div>
  );
}

export { CountComponent, HookComponent };
